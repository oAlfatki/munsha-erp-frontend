import { useFeatureResources } from '@/core/hooks/useFeatureResources';
import {
  ACCOUNTS_RESOURCE,
  ACQUISITIONS_RESOURCE,
  ASSETS_RESOURCE,
  CASH_RESOURCE,
  CONTACTS_RESOURCE,
  CURRENCIES_RESOURCE,
  DEPRECIATION_RESOURCE,
  JOURNALS_RESOURCE,
  VOUCHERS_RESOURCE,
} from '@/features/accounting/services/data-resources';
import { CUSTOMERS_RESOURCE } from '@/features/customers/services/data-resources';
import {
  ADVANCES_RESOURCE,
  EMPLOYEES_RESOURCE,
  PAYROLL_RESOURCE,
  SALARY_PAYMENTS_RESOURCE,
} from '@/features/employees/services/data-resources';
import {
  EXPENSE_DOCUMENTS_RESOURCE,
  EXPENSE_TYPES_RESOURCE,
} from '@/features/expenses/services/data-resources';
import {
  ITEMS_RESOURCE,
  MOVEMENTS_RESOURCE,
  STOCK_DOCUMENTS_RESOURCE,
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
  JOURNALS_RESOURCE,
  VOUCHERS_RESOURCE,
  ACCOUNTS_RESOURCE,
  CASH_RESOURCE,
  ASSETS_RESOURCE,
  CONTACTS_RESOURCE,
  CURRENCIES_RESOURCE,
  SYSTEM_RESOURCE,
  CUSTOMERS_RESOURCE,
  SUPPLIERS_RESOURCE,
  EMPLOYEES_RESOURCE,
  WAREHOUSES_RESOURCE,
  ITEMS_RESOURCE,
  STOCKS_RESOURCE,
  MOVEMENTS_RESOURCE,
  ACQUISITIONS_RESOURCE,
  DEPRECIATION_RESOURCE,
  EXPENSE_DOCUMENTS_RESOURCE,
  EXPENSE_TYPES_RESOURCE,
  SALE_INVOICES_RESOURCE,
  SALE_RETURNS_RESOURCE,
  PURCHASE_INVOICES_RESOURCE,
  PURCHASE_RETURNS_RESOURCE,
  STOCK_DOCUMENTS_RESOURCE,
  PAYROLL_RESOURCE,
  SALARY_PAYMENTS_RESOURCE,
  ADVANCES_RESOURCE,
];
export function useAccountingData() {
  return useFeatureResources(DATA_RESOURCES);
}
