import { useFeatureResources } from '@/core/hooks/useFeatureResources';
import {
  ACCOUNTS_RESOURCE,
  CASH_RESOURCE,
  CONTACTS_RESOURCE,
  CURRENCIES_RESOURCE,
  JOURNALS_RESOURCE,
} from '@/features/accounting/services/data-resources';
import { EMPLOYEES_RESOURCE } from '@/features/employees/services/data-resources';
import {
  EXPENSE_DOCUMENTS_RESOURCE,
  EXPENSE_TYPES_RESOURCE,
} from '@/features/expenses/services/data-resources';
import { SYSTEM_RESOURCE } from '@/features/settings/services/data-resources';
export const DATA_RESOURCES = [
  EXPENSE_TYPES_RESOURCE,
  EXPENSE_DOCUMENTS_RESOURCE,
  JOURNALS_RESOURCE,
  CURRENCIES_RESOURCE,
  CASH_RESOURCE,
  ACCOUNTS_RESOURCE,
  SYSTEM_RESOURCE,
  CONTACTS_RESOURCE,
  EMPLOYEES_RESOURCE,
];
export function useExpensesData() {
  return useFeatureResources(DATA_RESOURCES);
}
