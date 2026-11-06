import { fmt } from '@/core/utils/formatters';
import { StockBalanceHeader } from '@/features/inventory/stock-balances/components/StockBalanceHeader';
import { WarehouseTransferDialog } from '@/features/inventory/stock-balances/components/WarehouseTransferDialog';
import { useInventoryController } from '@/features/inventory/stock-balances/hooks/useInventoryController';
import { quantityByUnits } from '@/features/inventory/stock-balances/services/models/inventory-display';
import type { InventoryViewProps } from '@/features/inventory/stock-balances/types/props/InventoryViewProps';
import { systemSettings } from '@/features/organization/public';
import { Pill } from '@/shared/ui/display/Pill';
import { SearchBox } from '@/shared/ui/filters/SearchBox';
import { Select } from '@/shared/ui/forms/Select';
import { DataTable } from '@/shared/ui/tables/DataTable';

export function Inventory({ initialTab = 'balances' }: InventoryViewProps) {

  const model = useInventoryController(initialTab);
  if (!model) return null;
  const {
    s: state,
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
    warehouses,
    rows,
    moves,
  } = model;
  return (
    <>
      <StockBalanceHeader model={model} />
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
                    (x) => systemSettings(state).inventory.alert && x.p.alert && x.qty <= x.p.min,
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
                  systemSettings(state).inventory.alert && product.alert && qty <= product.min
                    ? 'amber'
                    : 'green'
                }
              >
                {systemSettings(state).inventory.alert && product.alert && qty <= product.min
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
            state.products.find((product) => product.id === m.productId)?.name,
            state.warehouses.find((warehouse) => warehouse.id === m.warehouseId)?.name,
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
            state.branches.find((branch) => branch.id === warehouse.branchId)?.name,
            state.stocks.filter((x) => x.warehouseId === warehouse.id && x.qty > 0).length,
            <Pill>{warehouse.active ? 'نشط' : 'غير نشط'}</Pill>,
          ])}
        />
      )}
      <WarehouseTransferDialog model={model} />
    </>
  );
}
