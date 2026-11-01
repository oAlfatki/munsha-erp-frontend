import { useFeatureResources } from '@/core/hooks/useFeatureResources';
import {
  ACCOUNTS_RESOURCE,
  CASH_RESOURCE,
  CURRENCIES_RESOURCE,
  JOURNALS_RESOURCE,
} from '@/features/accounting/services/data-resources';
import { CUSTOMERS_RESOURCE } from '@/features/customers/services/data-resources';
import {
  ITEMS_RESOURCE,
  STOCKS_RESOURCE,
  WAREHOUSES_RESOURCE,
} from '@/features/inventory/services/data-resources';
import {
  PURCHASE_INVOICES_RESOURCE,
  PURCHASE_RETURNS_RESOURCE,
} from '@/features/purchases/services/data-resources';
import {
  SALE_INVOICES_RESOURCE,
  SALE_RETURNS_RESOURCE,
} from '@/features/sales/services/data-resources';
import { SYSTEM_RESOURCE } from '@/features/settings/services/data-resources';
import { SUPPLIERS_RESOURCE } from '@/features/suppliers/services/data-resources';
export const DATA_RESOURCES = [
  SALE_INVOICES_RESOURCE,
  SALE_RETURNS_RESOURCE,
  PURCHASE_INVOICES_RESOURCE,
  PURCHASE_RETURNS_RESOURCE,
  ITEMS_RESOURCE,
  STOCKS_RESOURCE,
  WAREHOUSES_RESOURCE,
  CUSTOMERS_RESOURCE,
  SUPPLIERS_RESOURCE,
  JOURNALS_RESOURCE,
  ACCOUNTS_RESOURCE,
  CASH_RESOURCE,
  CURRENCIES_RESOURCE,
  SYSTEM_RESOURCE,
];
export function useTradeData() {
  return useFeatureResources(DATA_RESOURCES);
}
