import { exportPdf, printReport } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { useInventoryCostQuery } from '@/features/inventory/queries/useInventoryCostQuery';
import { inventoryCost } from '@/features/inventory/services/models/inventory-cost';
import { extras } from '@/features/ledger/public/extensions';
import { fiscalRange } from '@/features/ledger/public/fiscal-range';
import { systemSettings } from '@/features/organization/public/system-settings';
import type { CostFilters } from '@/features/stock/public/types/models/CostFilters';
import { AmountWords } from '@/shared/ui/documents/AmountWords';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Download, Eye, Printer, Undo2 } from 'lucide-react';
import { useState } from 'react';
export function InventoryCost() {
  const { state: s, branchId } = useInventoryCostQuery();
  const initial: CostFilters = {
    ...fiscalRange(s!),
    warehouse: '',
    group: '',
    product: '',
    excludeZero: s ? !systemSettings(s).inventory.showZero : true,
    priceType: 'retail',
  };
  const [draft, setDraft] = useState(initial);
  const [filters, setFilters] = useState(initial);
  if (!s) return null;
  const report = inventoryCost(s, branchId, filters);
  const groups = extras(s).records.productGroups || [];
  const headers = [
    'رقم الصنف',
    'اسم الصنف',
    'الكمية المتاحة للوحدات',
    'متوسط سعر الشراء',
    'إجمالي التكلفة · YER',
    'سعر البيع · YER',
    'إجمالي قيمة البيع · YER',
  ];
  const data = report.rows.map((r) => [
    r.code,
    r.name,
    r.units,
    r.average,
    r.cost,
    r.price,
    r.saleValue,
  ]);
  const handleView = () => {
    if (draft.from <= draft.to) setFilters({ ...draft });
  };
  return (
    <>
      <PageHead
        title="تقرير تكلفة المخزون"
        description="التكلفة الدفترية التاريخية مقابل قيمة البيع بالأسعار الحالية، للمخزن والفرع المحددين."
        extra={
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleView}>
              <Eye size={16} />
              عرض
            </Button>
            <Button variant="outline" onClick={() => printReport()}>
              <Printer size={16} />
              طباعة
            </Button>
            <Button
              variant="outline"
              onClick={() => exportPdf('تقرير تكلفة المخزون', headers, data)}
            >
              <Download size={16} />
              تصدير
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setDraft(initial);
                setFilters(initial);
              }}
            >
              <Undo2 size={16} />
              تراجع
            </Button>
          </div>
        }
      />
      <ValidatedForm
        className="filter-bar report-filters"
        onSubmit={(e) => {
          e.preventDefault();
          handleView();
        }}
      >
        <Field label="من تاريخ">
          <Input
            required
            type="date"
            value={draft.from}
            max={draft.to}
            onChange={(e) => setDraft({ ...draft, from: e.target.value })}
          />
        </Field>
        <Field label="إلى تاريخ">
          <Input
            required
            type="date"
            value={draft.to}
            min={draft.from}
            onChange={(e) => setDraft({ ...draft, to: e.target.value })}
          />
        </Field>
        <Field label="المخزن">
          <Select
            value={draft.warehouse}
            onChange={(e) => setDraft({ ...draft, warehouse: e.target.value })}
          >
            <option value="">جميع مخازن الفرع</option>
            {s.warehouses
              .filter((warehouse) => warehouse.branchId === branchId)
              .map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
          </Select>
        </Field>
        <Field label="المجموعة">
          <Select
            value={draft.group}
            onChange={(e) => setDraft({ ...draft, group: e.target.value, product: '' })}
          >
            <option value="">جميع المجموعات</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="اسم الصنف">
          <Select
            value={draft.product}
            onChange={(e) => setDraft({ ...draft, product: e.target.value })}
          >
            <option value="">جميع الأصناف</option>
            {s.products
              .filter((product) => !draft.group || product.groupId === draft.group)
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </Select>
        </Field>
        <Field label="نوع سعر البيع">
          <Select
            value={draft.priceType}
            onChange={(e) =>
              setDraft({ ...draft, priceType: e.target.value as 'retail' | 'wholesale' })
            }
          >
            <option value="retail">تجزئة</option>
            <option value="wholesale">جملة</option>
          </Select>
        </Field>
        <label className="check-label">
          <input
            type="checkbox"
            checked={draft.excludeZero}
            onChange={(e) => setDraft({ ...draft, excludeZero: e.target.checked })}
          />
          تجاهل الأرصدة الصفرية
        </label>
        <Button type="submit" variant="outline">
          عرض النتائج
        </Button>
      </ValidatedForm>
      <div className="report-context">
        <span>
          {s.organization.name} · {s.branches.find((branch) => branch.id === branchId)?.name}
        </span>
        <span>
          {filters.from} ← {filters.to}
        </span>
        <span>حركات الفترة للأصناف المعروضة: {report.movements}</span>
      </div>
      <DataTable
        headers={headers}
        rows={data.map((r) =>
          r.map((v, i) =>
            typeof v === 'number'
              ? new Intl.NumberFormat('en-US', {
                  maximumFractionDigits: i === 3 ? 6 : i === 5 ? 4 : 2,
                }).format(v)
              : v,
          ),
        )}
      />
      <div className="document-stats">
        <div>
          <span>عدد الأصناف</span>
          <strong>{report.rows.length}</strong>
        </div>
        <div>
          <span>إجمالي التكلفة · YER</span>
          <strong>{fmt(report.cost)}</strong>
        </div>
        <div>
          <span>إجمالي قيمة البيع · YER</span>
          <strong>{fmt(report.sale)}</strong>
        </div>
      </div>
      <p>إجمالي التكلفة كتابة</p>
      <AmountWords amount={report.cost} />
      <p className="mt-5">إجمالي قيمة البيع كتابة</p>
      <AmountWords amount={report.sale} />
      <p className="info-note">
        الأرصدة تراكمية حتى نهاية الفترة وتشمل الرصيد السابق لبدايتها؛ عدّاد الحركات يخص الفترة
        المختارة. متوسط الشراء من القيمة الدفترية، وسعر البيع الحالي للوحدة الأساسية. قيمة البيع
        تقديرية وليست إيرادًا أو ربحًا محققًا.
      </p>
    </>
  );
}
