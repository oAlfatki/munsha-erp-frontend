import { collection, operations, records } from '@/core/query/resources';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import {
  fetchInventoryBalances,
  fetchInventoryItemGroups,
  fetchInventoryItems,
  fetchInventoryMovements,
  fetchInventoryStockCounts,
  fetchInventoryStockDocuments,
  fetchInventoryUnitCategories,
  fetchInventoryUnits,
  fetchInventoryWarehouses,
} from '@/features/inventory/api/read-api';
export const ITEMS_RESOURCE = collection(
  'inventory',
  'items',
  fetchInventoryItems,
  (items) => ({ products: items }) as Partial<ErpReadModel>,
);
export const WAREHOUSES_RESOURCE = collection(
  'inventory',
  'warehouses',
  fetchInventoryWarehouses,
  (items) => ({ warehouses: items }) as Partial<ErpReadModel>,
);
export const STOCKS_RESOURCE = collection(
  'inventory',
  'stocks',
  fetchInventoryBalances,
  (items) => ({ stocks: items }) as Partial<ErpReadModel>,
);
export const MOVEMENTS_RESOURCE = collection(
  'inventory',
  'movements',
  fetchInventoryMovements,
  (items) => ({ movements: items }) as Partial<ErpReadModel>,
);
export const STOCK_DOCUMENTS_RESOURCE = collection(
  'inventory',
  'stockDocuments',
  fetchInventoryStockDocuments,
  (items) => ({ stockDocuments: items }) as Partial<ErpReadModel>,
);
export const UNITS_RESOURCE = collection(
  'inventory',
  'units',
  fetchInventoryUnits,
  (items) => records('units', items) as Partial<ErpReadModel>,
);
export const UNIT_CATEGORIES_RESOURCE = collection(
  'inventory',
  'unitCategories',
  fetchInventoryUnitCategories,
  (items) => records('categories', items) as Partial<ErpReadModel>,
);
export const ITEM_GROUPS_RESOURCE = collection(
  'inventory',
  'itemGroups',
  fetchInventoryItemGroups,
  (items) => records('groups', items) as Partial<ErpReadModel>,
);
export const STOCK_COUNTS_RESOURCE = collection(
  'inventory',
  'stockCounts',
  fetchInventoryStockCounts,
  (items) => operations(items) as Partial<ErpReadModel>,
);
