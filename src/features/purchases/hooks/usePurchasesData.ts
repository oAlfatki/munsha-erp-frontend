import { useFeatureResources } from '@/core/hooks/useFeatureResources';
import {
  ACCOUNTS_RESOURCE,
  CASH_RESOURCE,
  CURRENCIES_RESOURCE,
  JOURNALS_RESOURCE,
} from '@/features/accounting/services/data-resources';
import {
  ITEM_GROUPS_RESOURCE,
  ITEMS_RESOURCE,
  MOVEMENTS_RESOURCE,
  STOCKS_RESOURCE,
  UNIT_CATEGORIES_RESOURCE,
  UNITS_RESOURCE,
  WAREHOUSES_RESOURCE,
} from '@/features/inventory/services/data-resources';
import {
  PURCHASE_INVOICES_RESOURCE,
  PURCHASE_RETURNS_RESOURCE,
} from '@/features/purchases/services/data-resources';
import { SYSTEM_RESOURCE } from '@/features/settings/services/data-resources';
import { SUPPLIERS_RESOURCE } from '@/features/suppliers/services/data-resources';
export const DATA_RESOURCES = [
  MOVEMENTS_RESOURCE,
  ITEM_GROUPS_RESOURCE,
  UNITS_RESOURCE,
  UNIT_CATEGORIES_RESOURCE,
  PURCHASE_INVOICES_RESOURCE,
  PURCHASE_RETURNS_RESOURCE,
  ITEMS_RESOURCE,
  STOCKS_RESOURCE,
  WAREHOUSES_RESOURCE,
  SUPPLIERS_RESOURCE,
  JOURNALS_RESOURCE,
  ACCOUNTS_RESOURCE,
  CASH_RESOURCE,
  CURRENCIES_RESOURCE,
  SYSTEM_RESOURCE,
];
export function usePurchasesData() {
  return useFeatureResources(DATA_RESOURCES);
}
