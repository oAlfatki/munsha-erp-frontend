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
import { fmt, today } from '@/core/utils/formatters';
import { useInventoryController } from '@/features/inventory/hooks/useInventoryController';
import { quantityByUnits } from '@/features/inventory/services/models/inventory-display';
import { systemSettings } from '@/features/settings/services/models/system-settings';
export function Inventory() {
  const model = useInventoryController();
  if (!model) return null;
  const {
    s,
    isBusy,
    navigate,
    transferMutation,
    tab,
    setTab,
    searchQuery,
    setQ,
    wh,
    setWh,
    isShowUnits,
    setShowUnits,
    isExcludeZero,
    setExcludeZero,
    isTransfer,
    setTransfer,
    p,
    setP,
    from,
    setFrom,
    to,
    setTo,
    qty,
    setQty,
    warehouses,
    rows,
    moves,
  } = model;
  return (
    <>
      <PageHead
        title="المخزون والمخازن"
        description="أرصدة دقيقة، تكلفة واضحة وحركة موثقة لكل صنف."
        onAction={() => navigate('/inventory/transfer-document')}
        label="تحويل بين المخازن"
        extra={
          <ReportActions
            onExport={() =>
              tab === 'warehouses'
                ? exportPdf(
                    'قائمة المخازن',
                    ['اسم المخزن', 'الفرع', 'الأصناف ذات رصيد', 'الحالة'],
                    warehouses.map((warehouse) => [
                      warehouse.name,
                      s.branches.find((branch) => branch.id === warehouse.branchId)?.name || '',
                      s.stocks.filter((x) => x.warehouseId === warehouse.id && x.qty > 0).length,
                      warehouse.active ? 'نشط' : 'غير نشط',
                    ]),
                  )
                : tab === 'movements'
                  ? exportPdf(
                      'حركة الأصناف',
                      [
                        'التاريخ',
                        'المستند',
                        'الصنف',
                        'المخزن',
                        'الحركة',
                        'الكمية بالأساسية',
                        'القيمة YER',
                      ],
                      moves.map((m) => [
                        m.date,
                        m.reference,
                        s.products.find((product) => product.id === m.productId)?.name || '',
                        s.warehouses.find((warehouse) => warehouse.id === m.warehouseId)?.name ||
                          '',
                        m.kind,
                        m.qty,
                        m.value,
                      ]),
                    )
                  : exportPdf(
                      'أرصدة المخزون',
                      [
                        'الصنف',
                        'الكمية',
                        ...(isShowUnits ? ['الكمية المتاحة للوحدات'] : []),
                        'القيمة YER',
                      ],
                      rows.map((x) => [
                        x.p.name,
                        x.qty,
                        ...(isShowUnits ? [quantityByUnits(x.qty, x.p.units)] : []),
                        x.value,
                      ]),
                    )
            }
          />
        }
      />
      <div className="module-tabs">
        {[
          ['balances', 'أرصدة المخازن'],
          ['movements', 'حركة الأصناف'],
          ['warehouses', 'قائمة المخازن'],
        ].map(([k, l]) => (
          <button className={tab === k ? 'active' : ''} onClick={() => setTab(k)} key={k}>
            {l}
          </button>
        ))}
      </div>
      <div className="filter-bar">
        <SearchBox value={searchQuery} onChange={setQ} placeholder="بحث عن صنف…" />
        <Select value={wh} onChange={(e) => setWh(e.target.value)}>
          <option value="all">جميع مخازن الفرع</option>
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </Select>
        {tab === 'balances' && (
          <>
            <label className="check-label">
              <input
                type="checkbox"
                checked={isShowUnits}
                onChange={(e) => setShowUnits(e.target.checked)}
              />
              إظهار الكمية المتاحة للوحدات
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={isExcludeZero}
                onChange={(e) => setExcludeZero(e.target.checked)}
              />
              تجاهل الأرصدة الصفرية
            </label>
          </>
        )}
      </div>
      {tab === 'balances' && (
        <>
          <div className="document-stats">
            <div>
              <span>القيمة بالعملة الأساسية</span>
              <strong>
                {fmt(rows.reduce((n, x) => n + x.value, 0))} <small>YER</small>
              </strong>
            </div>
            <div>
              <span>عدد الأصناف</span>
              <strong>{rows.length}</strong>
            </div>
            <div>
              <span>بلغت حد الطلب</span>
              <strong>
                {
                  rows.filter(
                    (x) => systemSettings(s).inventory.alert && x.p.alert && x.qty <= x.p.min,
                  ).length
                }
              </strong>
            </div>
          </div>
          <DataTable
            headers={[
              'الصنف',
              'الوحدة الأساسية',
              'الرصيد',
              ...(isShowUnits ? ['الكمية المتاحة للوحدات'] : []),
              'متوسط التكلفة',
              'قيمة المخزون YER',
              'حد الطلب',
              'الحالة',
            ]}
            rows={rows.map(({ p: product, qty, value }) => [
              <strong>{product.name}</strong>,
              product.units.at(-1)?.name,
              fmt(qty),
              ...(isShowUnits ? [quantityByUnits(qty, product.units)] : []),
              fmt(qty ? value / qty : 0),
              <strong>{fmt(value)}</strong>,
              fmt(product.min),
              <Pill
                tone={
                  systemSettings(s).inventory.alert && product.alert && qty <= product.min
                    ? 'amber'
                    : 'green'
                }
              >
                {systemSettings(s).inventory.alert && product.alert && qty <= product.min
                  ? 'بلغ حد الطلب'
                  : 'متوفر'}
              </Pill>,
            ])}
          />
        </>
      )}
      {tab === 'movements' && (
        <DataTable
          headers={[
            'التاريخ',
            'المستند',
            'الصنف',
            'المخزن',
            'الحركة',
            'الكمية بالأساسية',
            'القيمة YER',
          ]}
          rows={moves.map((m) => [
            m.date,
            <span className="code">{m.reference}</span>,
            s.products.find((product) => product.id === m.productId)?.name,
            s.warehouses.find((warehouse) => warehouse.id === m.warehouseId)?.name,
            m.kind,
            <span className={m.qty < 0 ? 'negative' : 'positive'} dir="ltr">
              {m.qty > 0 ? '+' : ''}
              {fmt(m.qty)}
            </span>,
            fmt(Math.abs(m.value)),
          ])}
        />
      )}
      {tab === 'warehouses' && (
        <DataTable
          headers={['اسم المخزن', 'الفرع', 'الأصناف ذات رصيد', 'الحالة']}
          rows={warehouses.map((warehouse) => [
            warehouse.name,
            s.branches.find((branch) => branch.id === warehouse.branchId)?.name,
            s.stocks.filter((x) => x.warehouseId === warehouse.id && x.qty > 0).length,
            <Pill>{warehouse.active ? 'نشط' : 'غير نشط'}</Pill>,
          ])}
        />
      )}
      <Modal isOpen={isTransfer} title="تحويل بين المخازن" onClose={() => setTransfer(false)}>
        <ValidatedForm
          onSubmit={async (e) => {
            e.preventDefault();
            if (await transferMutation.execute({ productId: p, from, to, qty, date: today() }))
              setTransfer(false);
          }}
        >
          <div className="form-grid">
            <Field label="الصنف *">
              <Select value={p} onChange={(e) => setP(e.target.value)}>
                {s.products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="من المخزن *">
              <Select value={from} onChange={(e) => setFrom(e.target.value)}>
                {s.warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="إلى المخزن *">
              <Select value={to} onChange={(e) => setTo(e.target.value)}>
                {s.warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              label={
                'الكمية — ' +
                (s.products.find((product) => product.id === p)?.units.at(-1)?.name ||
                  'الوحدة الأساسية')
              }
            >
              <Input
                type="number"
                min="0.0001"
                step="any"
                value={qty}
                onChange={(e) => setQty(+e.target.value)}
                required
              />
            </Field>
          </div>
          <div className="info-note">
            ينقل الكمية بالقيمة الدفترية الحالية. مجموع مخزون المنشأة لا يتغير، ولا ينتج ربح من
            التحويل.
          </div>
          <div className="dialog-actions">
            <Button disabled={isBusy}>حفظ نهائي</Button>
            <Button type="button" variant="outline" onClick={() => setTransfer(false)}>
              تراجع
            </Button>
          </div>
        </ValidatedForm>
      </Modal>
    </>
  );
}
