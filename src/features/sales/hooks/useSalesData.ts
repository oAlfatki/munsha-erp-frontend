import { useFeatureResources } from '@/core/hooks/useFeatureResources';
import {
  ACCOUNTS_RESOURCE,
  CASH_RESOURCE,
  CURRENCIES_RESOURCE,
  JOURNALS_RESOURCE,
} from '@/features/accounting/services/data-resources';
import { CUSTOMERS_RESOURCE } from '@/features/customers/services/data-resources';
import { EMPLOYEES_RESOURCE } from '@/features/employees/services/data-resources';
import {
  ITEM_GROUPS_RESOURCE,
  ITEMS_RESOURCE,
  MOVEMENTS_RESOURCE,
  STOCKS_RESOURCE,
  UNIT_CATEGORIES_RESOURCE,
  UNITS_RESOURCE,
  WAREHOUSES_RESOURCE,
} from '@/features/inventory/services/data-resources';
import { PARTY_GROUPS_RESOURCE } from '@/features/parties/services/data-resources';
import {
  SALE_INVOICES_RESOURCE,
  SALE_RETURNS_RESOURCE,
  SALES_TARGETS_RESOURCE,
} from '@/features/sales/services/data-resources';
import { SYSTEM_RESOURCE } from '@/features/settings/services/data-resources';
export const DATA_RESOURCES = [
  MOVEMENTS_RESOURCE,
  ITEM_GROUPS_RESOURCE,
  UNITS_RESOURCE,
  UNIT_CATEGORIES_RESOURCE,
  EMPLOYEES_RESOURCE,
  SALES_TARGETS_RESOURCE,
  SALE_INVOICES_RESOURCE,
  SALE_RETURNS_RESOURCE,
  ITEMS_RESOURCE,
  STOCKS_RESOURCE,
  WAREHOUSES_RESOURCE,
  CUSTOMERS_RESOURCE,
  PARTY_GROUPS_RESOURCE,
  JOURNALS_RESOURCE,
  ACCOUNTS_RESOURCE,
  CASH_RESOURCE,
  CURRENCIES_RESOURCE,
  SYSTEM_RESOURCE,
];
export function useSalesData() {
  return useFeatureResources(DATA_RESOURCES);
}
