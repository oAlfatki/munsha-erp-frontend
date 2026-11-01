import { Modal } from '@/core/components/shared/dialogs/Modal';
import { Pill } from '@/core/components/shared/display/Pill';
import { AmountWords } from '@/core/components/shared/documents/AmountWords';
import { Field } from '@/core/components/shared/forms/Field';
import { Select } from '@/core/components/shared/forms/Select';
import { PageHead } from '@/core/components/shared/layout/PageHead';
import { DataTable } from '@/core/components/shared/tables/DataTable';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { useErpContext } from '@/core/hooks/useErpContext';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { exportPdf, printReport } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { usePeriodTransfer } from '@/features/accounting/hooks/usePeriodTransfer';
import {
  bookCatalog,
  isArchived,
  stockClosing,
} from '@/features/accounting/services/models/annual-books';
import { periodTransferSchema } from '@/features/accounting/validation/accounting-schema';
import { Database, Download, Eye, Printer, Save, Undo2 } from 'lucide-react';
import { useState } from 'react';
export function ClosingStockScreen() {
  const { state: s, revision, busy: isBusy, navigate } = useErpContext();
  const periodTransferMutationRequest = usePeriodTransfer();
  const periodTransferForm = useValidatedForm(
    periodTransferSchema,
    periodTransferMutationRequest.execute,
  );
  const periodTransferMutation = {
    ...periodTransferMutationRequest,
    execute: periodTransferForm.submit,
  };
  const initial = { date: s!.organization.year + '-12-31', branch: '', warehouse: '', query: '' };
  const [draft, setDraft] = useState(initial);
  const [filters, setFilters] = useState(initial);
  const [viewed, setViewed] = useState<number | null>(null);
  const [isConfirm, setConfirm] = useState(false);
  const [target, setTarget] = useState('');
  if (!s) return null;
  const catalog = bookCatalog(s);
  const targets = catalog.books.filter(
    (b) => b.status === 'preparing' && b.sourceId === catalog.activeId,
  );
  const inventory = stockClosing(s, filters.date, filters.branch, filters.warehouse).filter((r) =>
    [r.code, r.name, r.warehouse].join(' ').includes(filters.query),
  );
  const headers = [
    'رقم الصنف',
    'اسم الصنف',
    'الرصيد',
    'الوحدة',
    'المخزن',
    'متوسط سعر الشراء',
    'إجمالي الشراء · YER',
  ];
  const rows: (string | number)[][] = inventory.map((r) => [
    r.code,
    r.name,
    r.qty,
    r.unit,
    r.warehouse,
    r.average,
    r.value,
  ]);
  const total = money(inventory.reduce((n, r) => n + r.value, 0));
  const handleRefreshView = () => {
    if (draft.date < s.organization.year + '-01-01' || draft.date > s.organization.year + '-12-31')
      return;
    setFilters({ ...draft });
    setViewed(revision);
  };
  return (
    <>
      <PageHead
        title={
          '\u0631\u0635\u064A\u062F \u0645\u062E\u0632\u0648\u0646 \u0622\u062E\u0631 \u0627\u0644\u0645\u062F\u0629'
        }
        description="اعرض الأرصدة وراجعها، ثم احفظ لترحيلها إلى الفترة الجديدة."
        extra={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleRefreshView}>
              <Eye size={16} />
              عرض
            </Button>
            <Button disabled={isBusy || isArchived(s)} onClick={() => setConfirm(true)}>
              <Save size={16} />
              حفظ
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setDraft(initial);
                setFilters(initial);
                setViewed(null);
                setConfirm(false);
              }}
            >
              <Undo2 size={16} />
              تراجع
            </Button>
            <Button variant="outline" onClick={() => printReport()}>
              <Printer size={16} />
              طباعة
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                exportPdf(
                  '\u0631\u0635\u064A\u062F \u0645\u062E\u0632\u0648\u0646 \u0622\u062E\u0631 \u0627\u0644\u0645\u062F\u0629',
                  headers,
                  rows,
                )
              }
            >
              <Download size={16} />
              تصدير
            </Button>
          </div>
        }
      />
      <div className="filter-bar report-filters">
        <Field label="كما في تاريخ">
          <Input
            type="date"
            min={s.organization.year + '-01-01'}
            max={s.organization.year + '-12-31'}
            value={draft.date}
            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
          />
        </Field>
        <Field label="الفرع">
          <Select
            value={draft.branch}
            onChange={(e) => setDraft({ ...draft, branch: e.target.value, warehouse: '' })}
          >
            <option value="">جميع الفروع</option>
            {s.branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </Select>
        </Field>
        {
          <Field label="المخزن">
            <Select
              value={draft.warehouse}
              onChange={(e) => setDraft({ ...draft, warehouse: e.target.value })}
            >
              <option value="">جميع المخازن</option>
              {s.warehouses
                .filter((warehouse) => !draft.branch || warehouse.branchId === draft.branch)
                .map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
            </Select>
          </Field>
        }
        <Field label="بحث">
          <Input
            value={draft.query}
            onChange={(e) => setDraft({ ...draft, query: e.target.value })}
          />
        </Field>
      </div>
      <div className="report-context">
        <span data-report-meta="الفرع">
          {filters.branch ? s.branches.find((b) => b.id === filters.branch)?.name : 'جميع الفروع'}
        </span>
        <span>
          {s.organization.name} · السنة {s.organization.year}
        </span>
        <span data-report-meta="النطاق">
          {filters.date} ·{' '}
          {filters.branch ? s.branches.find((b) => b.id === filters.branch)?.name : 'جميع الفروع'}
        </span>
        <Pill tone={viewed === revision ? 'green' : 'amber'}>
          {viewed === revision ? 'تم عرض أحدث البيانات' : 'اضغط عرض قبل الترحيل'}
        </Pill>
      </div>
      {false}
      <DataTable
        headers={headers}
        rows={rows.map((row) =>
          row.map((v, i) =>
            typeof v === 'number'
              ? new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: i === 2 || i === 5 ? 6 : 2,
                }).format(v)
              : v,
          ),
        )}
      />
      <div className="document-stats">
        <div>
          <span>عدد {'النتائج'}</span>
          <strong>{rows.length}</strong>
        </div>
        {
          <div>
            <span>إجمالي تكلفة المخزون · YER</span>
            <strong>{fmt(total)}</strong>
          </div>
        }
      </div>
      {<AmountWords amount={total} />}
      <div className="info-note">
        الحفظ يرحّل أرصدة نهاية السنة لجميع الفروع والمخازن، ويشترط إزالة مرشحات العرض. التراجع يمسح
        مرشحات الشاشة فقط؛ لا يلغي ترحيلًا محفوظًا.
      </div>
      <Button variant="outline" onClick={() => navigate('/settings/annual-books')}>
        <Database size={16} />
        إنشاء الفترة الجديدة وإدارة الترحيل
      </Button>
      <Modal
        isOpen={isConfirm}
        title="حفظ = ترحيل أرصدة نهاية السنة"
        onClose={() => setConfirm(false)}
        description="تُنقل الأرصدة إلى مساحة السنة التالية داخل قاعدة الاستضافة الحالية. لا تنشأ قاعدة فعلية مستقلة."
      >
        <div className="info-note">
          {'ترحيل الكميات والقيم التاريخية لكل مخزن.'} لن تتغير الفترة المفتوحة حتى اكتمال الخطوتين
          وتفعيل الفترة الجديدة.
        </div>
        {!targets.length ? (
          <Button
            onClick={() => {
              setConfirm(false);
              navigate('/settings/annual-books');
            }}
          >
            إنشاء فترة جديدة أولًا
          </Button>
        ) : (
          <>
            <Field label="الفترة الوجهة">
              <Select value={target} onChange={(e) => setTarget(e.target.value)}>
                <option value="">اختر السنة الجديدة</option>
                {targets.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} · {t.year}
                    {t.stockDone ? ' · مرحّل بالفعل' : ''}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="dialog-actions">
              <Button
                disabled={
                  isBusy ||
                  !target ||
                  viewed !== revision ||
                  filters.date !== s.organization.year + '-12-31' ||
                  !!filters.branch ||
                  !!filters.warehouse ||
                  !!filters.query
                }
                onClick={async () => {
                  if (
                    await periodTransferMutation.execute({
                      id: target,
                      kind: 'stock',
                      date: filters.date,
                      confirmed: true,
                    })
                  ) {
                    setConfirm(false);
                    setViewed(null);
                  }
                }}
              >
                <Save size={16} />
                تأكيد حفظ وترحيل الأرصدة
              </Button>
              <Button variant="ghost" onClick={() => setConfirm(false)}>
                تراجع
              </Button>
            </div>
            <p>
              اعرض أحدث الأرصدة دون بحث أو تصفية، بتاريخ {s.organization.year}-12-31 لتفعيل الحفظ.
            </p>
          </>
        )}
      </Modal>
    </>
  );
}
