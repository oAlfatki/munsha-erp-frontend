import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const INVENTORY_ROUTES:RouteObject[]=[
{
    path:ROUTES.INVENTORY,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/InventoryBalancesPage')).default,
    }),
    handle: { module: 'inventory', title: '', },
  },
{
    path:ROUTES.INVENTORY_MOVEMENTS,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/InventoryBalancesPage')).default,
    }),
    handle: { module: 'inventory', title: '', },
  },
{
    path:ROUTES.INVENTORY_ADJUSTMENT,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StockAdjustmentPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'فاتورة تسوية المخزون',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_ADJUSTMENTS,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StockAdjustmentHistoryPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'قائمة تسويات المخزون',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_COST,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/InventoryValuationPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'تقرير تكلفة المخزون',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_COUNT,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StockCountPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'الجرد الفعلي',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_END_STOCK,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/ClosingStockPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'تقرير مخزون آخر المدة',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_GROUPS,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/ItemGroupListPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'قائمة المجموعات',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_GROUPS_ADD,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/CreateItemGroupPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'إضافة مجموعة',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_HISTORICAL_COST,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/HistoricalInventoryCostPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'مراجعة تكلفة الصنف التاريخية',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_OPENING_STOCK,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/OpeningStockPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'إضافة أصناف بداية المدة',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_OPENING_STOCK_REPORT,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/OpeningStockReportPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'تقرير أصناف بداية المدة',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_REORDER,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/ReorderAlertsPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'أصناف بلغت حد الطلب',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_STAGNANT,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StagnantInventoryPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'الأصناف الراكدة',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_TRANSFER_DOCUMENT,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StockTransferPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'إضافة فاتورة تحويل مخزني',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_TRANSFERS,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/StockTransferHistoryPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'فواتير التحويل بين المخازن',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_UNITS,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/UnitListPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'قائمة الوحدات',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_UNITS_ADD,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/CreateUnitPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'إضافة وحدة',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_WAREHOUSES,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/WarehouseListPage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'قائمة المخازن',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_WAREHOUSES_ADD,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/CreateWarehousePage')).default,
    }),
    handle: {
      module: 'inventory',
      title: 'إضافة مخزن',
      navModule: 'inventory',
    },
  },
{
    path:ROUTES.INVENTORY_ITEMS,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/ProductListPage')).default,
    }),
    handle: { module: 'inventory', title: '', },
  },
{
    path:ROUTES.INVENTORY_ITEMS_NEW,
    lazy: async () => ({
      Component: (await import('@/features/inventory/pages/ProductListPage')).default,
    }),
    handle: { module: 'inventory', title: '', },
  }
];
