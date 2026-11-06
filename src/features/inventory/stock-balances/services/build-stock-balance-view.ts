import type { InventoryControllerReadModel } from '@/features/inventory/stock-balances/types/read-models/InventoryControllerReadModel';

export function buildStockBalanceView(
  s: InventoryControllerReadModel,
  branchId: string,
  searchQuery: string,
  wh: string,
  isExcludeZero: boolean,
) {

  const warehouses = s.warehouses.filter((warehouse) => warehouse.branchId === branchId);
  const rows = s.products
    .filter((product) => product.name.includes(searchQuery))
    .map((product) => {
      const st = s.stocks.filter(
        (x) =>
          x.productId === product.id &&
          warehouses.some((warehouse) => warehouse.id === x.warehouseId) &&
          (wh === 'all' || x.warehouseId === wh),
      );
      return {
        p: product,
        qty: st.reduce((n, x) => n + x.qty, 0),
        value: st.reduce((n, x) => n + x.value, 0),
      };
    })
    .filter((r) => !isExcludeZero || Math.abs(r.qty) > 0.0000001 || Math.abs(r.value) > 0.005);
  const moves = s.movements
    .filter(
      (m) =>
        warehouses.some((warehouse) => warehouse.id === m.warehouseId) &&
        (wh === 'all' || m.warehouseId === wh) &&
        (s.products.find((product) => product.id === m.productId)?.name || '').includes(
          searchQuery,
        ),
    )
    .slice()
    .reverse();
  return { warehouses, rows, moves };
}
