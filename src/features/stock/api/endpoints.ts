import { commandPath } from '@/core/api/command-path';
import { pathSegment } from '@/core/api/path-segment';

export const ENDPOINTS = {
  command: commandPath,
  fetchInventoryItems: `/inventory/items`,

  fetchInventoryItemsById: (id: string) => `/inventory/items/${pathSegment(id)}`,

  fetchInventoryWarehouses: `/inventory/warehouses`,

  fetchInventoryWarehousesById: (id: string) => `/inventory/warehouses/${pathSegment(id)}`,

  fetchInventoryUnits: `/inventory/units`,

  fetchInventoryUnitsById: (id: string) => `/inventory/units/${pathSegment(id)}`,

  fetchInventoryUnitCategories: `/inventory/unit-categories`,

  fetchInventoryUnitCategoriesById: (id: string) => `/inventory/unit-categories/${pathSegment(id)}`,

  fetchInventoryItemGroups: `/inventory/item-groups`,

  fetchInventoryItemGroupsById: (id: string) => `/inventory/item-groups/${pathSegment(id)}`,

  fetchInventoryStockDocuments: `/inventory/stock-documents`,

  fetchInventoryStockDocumentsById: (id: string) => `/inventory/stock-documents/${pathSegment(id)}`,

  fetchInventoryBalances: `/inventory/balances`,
  fetchInventoryMovements: `/inventory/movements`,

  fetchInventoryItemsByIdUnits: (id: string) => `/inventory/items/${pathSegment(id)}/units`,

  fetchInventoryStockCounts: `/inventory/stock-counts`,

  fetchInventoryStockCountsById: (id: string) => `/inventory/stock-counts/${pathSegment(id)}`,

  fetchSearchItems: `/search/items`,
} as const;
