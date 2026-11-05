import { ROUTES } from '@/core/config/navigation-paths';

import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { exportPdf, printReport } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { usePeriodTransfer } from '@/features/accounting/fiscal-periods/hooks/usePeriodTransfer';
import { useClosingAccountBalancesScreenQuery } from '@/features/accounting/fiscal-periods/queries/useClosingAccountBalancesScreenQuery';
import {
  accountClosing,
  bookCatalog,
  isArchived,
  periodTransferSchema,
} from '@/features/ledger/public';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { AmountWords } from '@/shared/ui/documents/AmountWords';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Database, Download, Eye, Printer, Save, Undo2 } from 'lucide-react';
import { useState } from 'react';
export function ClosingAccountBalancesScreen() {
  const { state: s, revision, busy: isBusy, navigate } = useClosingAccountBalancesScreenQuery();
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
  const accounts = accountClosing(s, filters.date, filters.branch).filter((r) =>
    [r.account, r.name].join(' ').includes(filters.query),
  );
  const headers = [
    'رقم الحساب',
    'اسم الحساب',
    'الفرع',
    'مدين بالعملة',
    'دائن بالعملة',
    'العملة',
    'سعر الصرف',
    'مدين محلي',
    'دائن محلي',
    'البيان',
  ];
  const rows: (string | number)[][] = accounts.map((r) => [
    r.account,
    r.name,
    s.branches.find((branch) => branch.id === r.branchId)?.name || r.branchId,
    Math.max(r.amount, 0),
    Math.max(-r.amount, 0),
    s.organization.currency,
    1,
    Math.max(r.amount, 0),
    Math.max(-r.amount, 0),
    'رصيد نهاية الفترة',
  ]);
  const debit = money(accounts.reduce((n, r) => n + Math.max(r.amount, 0), 0));
  const credit = money(accounts.reduce((n, r) => n + Math.max(-r.amount, 0), 0));
  const difference = money(debit - credit);
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
          '\u0623\u0631\u0635\u062F\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629'
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
                  '\u0623\u0631\u0635\u062F\u0629 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0641\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0645\u0646\u062A\u0647\u064A\u0629',
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
        {false}
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
      {
        <div className="info-note">
          دفتر القيود الحالي يحتفظ بالمبالغ المحلية فقط؛ تظهر العملة الأساسية بسعر 1. لا تُستنتج
          أرصدة عملات أجنبية من أسعار الصرف الحالية. الترحيل يحفظ ذمم الأطراف كلًا على حدة.
        </div>
      }
      <DataTable
        headers={headers}
        rows={rows.map((row) =>
          row.map((v, _i) =>
            typeof v === 'number'
              ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(v)
              : v,
          ),
        )}
      />
      <div className="document-stats">
        <div>
          <span>عدد {'الحسابات والأطراف'}</span>
          <strong>{rows.length}</strong>
        </div>
        {
          <>
            <div>
              <span>إجمالي مدين · YER</span>
              <strong>{fmt(debit)}</strong>
            </div>
            <div>
              <span>إجمالي دائن · YER</span>
              <strong>{fmt(credit)}</strong>
            </div>
            <div>
              <span>الفرق بين المدين والدائن</span>
              <strong>{fmt(difference)}</strong>
            </div>
          </>
        }
      </div>
      {
        <div className="grid gap-3 mt-5">
          <div>
            <p>إجمالي المدين كتابة</p>
            <AmountWords amount={debit} />
          </div>
          <div>
            <p>إجمالي الدائن كتابة</p>
            <AmountWords amount={credit} />
          </div>
        </div>
      }
      <div className="info-note">
        الحفظ يرحّل أرصدة نهاية السنة لجميع الفروع والمخازن، ويشترط إزالة مرشحات العرض. التراجع يمسح
        مرشحات الشاشة فقط؛ لا يلغي ترحيلًا محفوظًا.
      </div>
      <Button variant="outline" onClick={() => navigate(ROUTES.SETTINGS_ANNUAL_BOOKS)}>
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
          {
            'ترحيل الأرصدة الدائمة والذمم، وإقفال نتيجة السنة في النتائج المتراكمة؛ رأس المال يبقى وفق رصيده.'
          }{' '}
          لن تتغير الفترة المفتوحة حتى اكتمال الخطوتين وتفعيل الفترة الجديدة.
        </div>
        {!targets.length ? (
          <Button
            onClick={() => {
              setConfirm(false);
              navigate(ROUTES.SETTINGS_ANNUAL_BOOKS);
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
                    {t.accountsDone ? ' · مرحّل بالفعل' : ''}
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
                      kind: 'accounts',
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
