import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { useErpContext } from '@/core/hooks/useErpContext';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { exportDocument, printReport } from '@/core/reporting/service';
import type { ReportDocument } from '@/core/types/ReportDocument';
import { fmt } from '@/core/utils/formatters';
import { isArchived } from '@/features/accounting/services/models/annual-books';
import { extras } from '@/features/accounting/services/models/extensions';
import { usePriceList } from '@/features/inventory/hooks/usePriceList';
import { priceRows } from '@/features/inventory/services/models/price-list';
import type { PriceFilters } from '@/features/inventory/types/models/PriceFilters';
import { priceListSchema } from '@/features/inventory/validation/inventory-schema';
import { Download, Eye, Printer, Save, Undo2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
export function PriceList() {
  const { state: s, busy: isBusy, setEditingDocument } = useErpContext();
  const priceListMutationRequest = usePriceList(),
    priceListForm = useValidatedForm(priceListSchema, priceListMutationRequest.execute),
    priceListMutation = { ...priceListMutationRequest, execute: priceListForm.submit };
  const initial: PriceFilters = { group: '', product: '', priceType: 'retail' };
  const [draft, setDraft] = useState(initial),
    [filters, setFilters] = useState(initial),
    [baseline, setBaseline] = useState(() => priceRows(s!, initial)),
    [edits, setEdits] = useState<Record<string, string>>({});
  const isDirty = Object.keys(edits).length > 0;
  useEffect(() => {
    setEditingDocument(isDirty);
    return () => setEditingDocument(false);
  }, [isDirty]);
  if (!s) return null;
  const groups = extras(s).records.productGroups || [],
    headers = [
      'رقم الصنف',
      'اسم الصنف',
      'الوحدة',
      'سعر الشراء المرجعي',
      'سعر البيع',
      'الخصم الأقصى %',
    ];
  const rows = baseline.map((r) => [
    r.code,
    r.name,
    r.unitName,
    r.purchase,
    edits[r.key] !== undefined ? Number(edits[r.key]) : r.price,
    r.discount,
  ]);
  const report = (): ReportDocument => ({
    title: 'تسعيرة الأصناف',
    metadata: [
      ['المجموعة', groups.find((g) => g.id === filters.group)?.name || 'جميع المجموعات'],
      ['الصنف', s.products.find((p) => p.id === filters.product)?.name || 'جميع الأصناف'],
      ['نوع السعر', filters.priceType === 'retail' ? 'تجزئة' : 'جملة'],
      ['العملة', s.organization.currency],
      ['حالة الأسعار', isDirty ? 'معاينة تعديلات غير محفوظة' : 'الأسعار المعروضة عند آخر عرض'],
    ],
    tables: [{ headers, rows }],
    totals: [
      ['عدد الأصناف', String(new Set(baseline.map((r) => r.productId)).size)],
      ['عدد النتائج / الوحدات', String(baseline.length)],
    ],
    words: [],
    notes: ['تعديل سعر البيع لا يغير تكلفة المخزون أو الفواتير المحفوظة.'],
  });
  const handleView = () => {
    setFilters({ ...draft });
    setBaseline(priceRows(s, draft));
    setEdits({});
  };
  const handleSave = async () => {
    const changed = baseline.filter((r) => edits[r.key] !== undefined);
    if (
      changed.some(
        (r) =>
          edits[r.key].trim() === '' ||
          !Number.isFinite(Number(edits[r.key])) ||
          Number(edits[r.key]) < 0 ||
          Number(edits[r.key]) > 1e9,
      )
    ) {
      toast.error('راجع الأسعار؛ يجب إدخال أرقام بين صفر ومليار');
      return;
    }
    if (
      await priceListMutation.execute({
        priceType: filters.priceType,
        rows: changed.map((r) => ({
          productId: r.productId,
          unit: r.unit,
          expectedPrice: r.price,
          expectedFactor: r.factor,
          price: Number(edits[r.key]),
        })),
      })
    ) {
      setBaseline(
        baseline.map((r) =>
          edits[r.key] !== undefined ? { ...r, price: Number(edits[r.key]) } : r,
        ),
      );
      setEdits({});
    }
  };
  return (
    <>
      <PageHead
        title="تسعيرة الأصناف"
        description="اضغط على سعر البيع وعدله لكل وحدة، ثم احفظ التغييرات معًا."
        extra={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" disabled={isDirty} onClick={handleView}>
              <Eye size={16} />
              عرض
            </Button>
            <Button variant="outline" onClick={() => printReport(report())}>
              <Printer size={16} />
              طباعة
            </Button>
            <Button disabled={!isDirty || isBusy || isArchived(s)} onClick={handleSave}>
              <Save size={16} />
              حفظ
            </Button>
            <Button variant="outline" onClick={() => exportDocument(report())}>
              <Download size={16} />
              تصدير
            </Button>
            <Button
              variant="ghost"
              disabled={!isDirty}
              onClick={() => {
                setEdits({});
                setBaseline(priceRows(s, filters));
              }}
            >
              <Undo2 size={16} />
              تراجع
            </Button>
          </div>
        }
      />
      <div className="filter-bar">
        <Field label="المجموعة">
          <Select
            disabled={isDirty}
            value={draft.group}
            onChange={(e) => setDraft({ ...draft, group: e.target.value, product: '' })}
          >
            <option value="">جميع المجموعات</option>
            {groups
              .filter((g) => g.active)
              .map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
          </Select>
        </Field>
        <Field label="الصنف">
          <Select
            disabled={isDirty}
            value={draft.product}
            onChange={(e) => setDraft({ ...draft, product: e.target.value })}
          >
            <option value="">جميع الأصناف</option>
            {s.products
              .filter(
                (product) => product.active && (!draft.group || product.groupId === draft.group),
              )
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </Select>
        </Field>
        <Field label="نوع سعر البيع">
          <Select
            disabled={isDirty}
            value={draft.priceType}
            onChange={(e) =>
              setDraft({ ...draft, priceType: e.target.value as PriceFilters['priceType'] })
            }
          >
            <option value="retail">تجزئة</option>
            <option value="wholesale">جملة</option>
          </Select>
        </Field>
        <span className="muted">الأسعار بالعملة الأساسية {s.organization.currency}</span>
      </div>
      {isDirty && (
        <p className="info-note">
          توجد {Object.keys(edits).length} أسعار معدلة غير محفوظة. احفظ أو تراجع قبل تغيير المرشحات؛
          الطباعة والتصدير يوضحان أن الأسعار معاينة.
        </p>
      )}
      <DataTable
        headers={headers}
        rows={baseline.map((r) => [
          r.code,
          r.name,
          r.unitName,
          fmt(r.purchase),
          <Input
            className="price-cell-input"
            aria-label={'سعر بيع ' + r.name + ' — ' + r.unitName}
            disabled={isBusy || isArchived(s)}
            type="number"
            min="0"
            max="1000000000"
            step="any"
            value={edits[r.key] ?? r.price}
            onChange={(e) => {
              const value = e.target.value;
              setEdits((current) => {
                const next = { ...current };
                if (value !== '' && Number(value) === r.price) delete next[r.key];
                else next[r.key] = value;
                return next;
              });
            }}
          />,
          fmt(r.discount),
        ])}
      />
      <div className="document-stats">
        <div>
          <span>عدد الأصناف</span>
          <strong>{new Set(baseline.map((r) => r.productId)).size}</strong>
        </div>
        <div>
          <span>عدد النتائج / الوحدات</span>
          <strong>{baseline.length}</strong>
        </div>
      </div>
      <p className="info-note">
        الشراء المرجعي من بطاقة الوحدة، وليس إعادة تقييم للتكلفة الدفترية. لا تعدّل هذه الشاشة أسعار
        الفواتير القديمة أو أرصدة المخزون.
      </p>
    </>
  );
}
