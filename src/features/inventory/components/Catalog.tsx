import { ViewButton } from '@/core/components/shared/actions/ViewButton';
import { Modal } from '@/core/components/shared/dialogs/Modal';
import { Pill } from '@/core/components/shared/display/Pill';
import { SearchBox } from '@/core/components/shared/filters/SearchBox';
import { Field } from '@/core/components/shared/forms/Field';
import { Select } from '@/core/components/shared/forms/Select';
import { Form as ValidatedForm } from '@/core/components/shared/forms/ValidatedForm';
import { PageHead } from '@/core/components/shared/layout/PageHead';
import { ReportActions } from '@/core/components/shared/reports/ReportActions';
import { DataTable } from '@/core/components/shared/tables/DataTable';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { exportPdf } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { extras } from '@/features/accounting/services/models/extensions';
import { useCatalogController } from '@/features/inventory/hooks/useCatalogController';
import { useProductEditorController } from '@/features/inventory/hooks/useProductEditorController';
import type { ProductEditorProps } from '@/features/inventory/types/ProductEditorProps';
import { Check, Layers3, Package } from 'lucide-react';
export function Catalog() {
  const model = useCatalogController();
  if (!model) return null;
  const { s, search, setSearch, editing, setEditing, items, close } = model;
  return (
    <>
      <PageHead
        title="دليل الأصناف"
        description="أصنافك، وحداتها وأسعارها. كل التفاصيل في مكان واحد."
        onAction={() => setEditing(null)}
        label="إضافة صنف"
        extra={
          <ReportActions
            onExport={() =>
              exportPdf(
                'الأصناف',
                ['الرمز', 'الاسم', 'المجموعة', 'سعر التجزئة'],
                items.map((product) => [
                  product.code,
                  product.name,
                  extras(s).records.productGroups?.find((g) => g.id === product.groupId)?.name ||
                    '—',
                  product.units.at(-1)!.retail,
                ]),
              )
            }
          />
        }
      />
      <div className="mini-stats">
        <div>
          <Package />
          <span>
            إجمالي الأصناف<b>{s.products.length}</b>
          </span>
        </div>
        <div>
          <Check />
          <span>
            الأصناف النشطة<b>{s.products.filter((product) => product.active).length}</b>
          </span>
        </div>
        <div>
          <Layers3 />
          <span>
            الوحدات المدعومة<b>أحادية / ثنائية / ثلاثية</b>
          </span>
        </div>
      </div>
      <div className="list-toolbar">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="ابحث باسم الصنف، الرمز أو الباركود…"
        />
        <span className="muted">{items.length} أصناف</span>
      </div>
      <DataTable
        headers={[
          'الصنف',
          'رمز الصنف',
          'عدد الوحدات',
          'الوحدة الأساسية',
          'تجزئة / حبة',
          'الحالة',
          'عرض',
        ]}
        rows={items.map((p) => [
          <div className="table-main">
            <span className="product-avatar">{p.name.slice(0, 1)}</span>
            <strong>{p.name}</strong>
          </div>,
          <span className="code">{p.code}</span>,
          String(p.units.length),
          p.units.at(-1)?.name,
          <strong className="numeric">
            {fmt(p.units.at(-1)!.retail)} <small>ر.ي</small>
          </strong>,
          <Pill tone={p.active ? 'green' : 'gray'}>{p.active ? 'نشط' : 'غير نشط'}</Pill>,
          <ViewButton onClick={() => setEditing(p)} />,
        ])}
      />
      {editing !== undefined && <ProductEditor product={editing} onClose={close} />}
    </>
  );
}
export function ProductEditor({ product, onClose: close }: ProductEditorProps) {
  const model = useProductEditorController({ product, onClose: close });
  if (!model) return null;
  const {
    isBusy,
    workspace,
    name,
    setName,
    groupId,
    setGroupId,
    category,
    units,
    setUnits,
    ratios,
    setRatios,
    isActive,
    setActive,
    min,
    setMin,
    isAlert,
    setAlert,
    discount,
    setDiscount,
    profit,
    setProfit,
    isAuto,
    setAuto,
    changeCategory,
    factors,
    price,
    handleSubmit,
  } = model;
  return (
    <Modal
      isOpen
      title={product ? 'بطاقة الصنف — عرض وتعديل' : 'إضافة صنف جديد'}
      onClose={close}
      isWide
    >
      <ValidatedForm onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="اسم الصنف *">
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: بسكويت الشاي"
            />
          </Field>
          <Field label="المجموعة">
            <Select value={groupId} onChange={(e) => setGroupId(e.target.value)}>
              <option value="">دون مجموعة</option>
              {(workspace ? extras(workspace).records.productGroups || [] : [])
                .filter((g) => g.active || g.id === groupId)
                .map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
            </Select>
          </Field>
          <Field label="عدد وحدات الصنف *">
            <Select value={category} onChange={(e) => changeCategory(+e.target.value as 1 | 2 | 3)}>
              <option value="1">أحادية — وحدة بيع واحدة</option>
              <option value="2">ثنائية — وحدتان</option>
              <option value="3">ثلاثية — ثلاث وحدات</option>
            </Select>
          </Field>
          <Field label="الحالة">
            <label className="check-label">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setActive(e.target.checked)}
              />
              صنف نشط
            </label>
          </Field>
        </div>
        <div className="form-section-title">
          <h3>الوحدات والأسعار</h3>
          <label className="check-label">
            <input type="checkbox" checked={isAuto} onChange={(e) => setAuto(e.target.checked)} />
            احتساب الوحدات الأصغر تلقائيًا
          </label>
        </div>
        <div className="info-note">
          ابدأ بالوحدة الأكبر. يحتسب سعر الأصغر افتراضيًا ويمكنك تعديله. الوحدة الأساسية هي الأصغر
          ويحددها النظام تلقائيًا.
        </div>
        <datalist id="unit-options">
          {workspace &&
            (extras(workspace).records.units || [])
              .filter((v) => v.active)
              .map((v) => <option key={v.id} value={v.name} />)}
        </datalist>
        {units.map((u, i) => (
          <div className="unit-editor" key={i}>
            <div className="unit-number">0{i + 1}</div>
            <div className="form-grid four">
              <Field label="اسم الوحدة *">
                <Input
                  list="unit-options"
                  required
                  value={u.name}
                  onChange={(e) =>
                    setUnits(units.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))
                  }
                />
              </Field>
              <Field label={i === units.length - 1 ? 'المعامل الأساسي' : 'عدد الوحدات التالية *'}>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  disabled={i === units.length - 1}
                  value={ratios[i]}
                  onChange={(e) => setRatios(ratios.map((x, j) => (j === i ? +e.target.value : x)))}
                />
              </Field>
              <Field label="سعر شراء مرجعي · YER">
                <Input
                  type="number"
                  min="0"
                  step="any"
                  value={u.purchase}
                  onChange={(e) => price(i, 'purchase', +e.target.value)}
                />
              </Field>
              <Field label="الباركود">
                <Input
                  dir="ltr"
                  value={u.barcode}
                  onChange={(e) =>
                    setUnits(units.map((x, j) => (j === i ? { ...x, barcode: e.target.value } : x)))
                  }
                />
              </Field>
              <Field label="سعر التجزئة · YER">
                <Input
                  type="number"
                  min="0"
                  step="any"
                  value={u.retail}
                  onChange={(e) => price(i, 'retail', +e.target.value)}
                />
              </Field>
              <Field label="سعر الجملة · YER">
                <Input
                  type="number"
                  min="0"
                  step="any"
                  value={u.wholesale}
                  onChange={(e) => price(i, 'wholesale', +e.target.value)}
                />
              </Field>
              <Field label="الربح المرجعي / تجزئة">
                <div className="input-readonly numeric">{fmt(u.retail - u.purchase)} ر.ي</div>
              </Field>
              <Field label="معامل التحويل إلى الأساسية">
                <div className="input-readonly">
                  {fmt(factors[i])} {units.at(-1)?.name}
                </div>
              </Field>
            </div>
          </div>
        ))}
        <div className="form-grid">
          <Field label="حد الطلب بالوحدة الأساسية">
            <Input type="number" min="0" value={min} onChange={(e) => setMin(+e.target.value)} />
          </Field>
          <Field label="أقصى خصم مسموح %">
            <Input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(+e.target.value)}
            />
          </Field>
          <Field label="تنبيه حد الطلب">
            <label className="check-label">
              <input
                type="checkbox"
                checked={isAlert}
                onChange={(e) => setAlert(e.target.checked)}
              />
              تفعيل التنبيه
            </label>
          </Field>
          <Field label="اقتراح ربح على سعر الشراء %">
            <Input
              type="number"
              min="0"
              value={profit}
              onChange={(e) => setProfit(+e.target.value)}
            />
          </Field>
          <div className="self-end pb-0.5">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setUnits(
                  units.map((u) => ({
                    ...u,
                    retail: +(u.purchase * (1 + profit / 100)).toFixed(2),
                  })),
                )
              }
            >
              احتساب التجزئة المقترحة
            </Button>
          </div>
        </div>
        <div className="info-note">
          رصيد البداية ليس ضمن بطاقة الصنف. الزيادة المجانية تُدخل في فاتورة الشراء، وتدخل في حساب
          التكلفة الفعلية دون تغيير معامل التعبئة.
        </div>
        <div className="dialog-actions">
          <Button disabled={isBusy} type="submit">
            {isBusy ? 'جارٍ الحفظ…' : 'حفظ الصنف'}
          </Button>
          <Button type="button" variant="outline" onClick={close}>
            تراجع
          </Button>
        </div>
      </ValidatedForm>
    </Modal>
  );
}
