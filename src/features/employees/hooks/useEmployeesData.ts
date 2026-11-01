import { useFeatureResources } from '@/core/hooks/useFeatureResources';
import {
  ACCOUNTS_RESOURCE,
  CASH_RESOURCE,
  CURRENCIES_RESOURCE,
  JOURNALS_RESOURCE,
} from '@/features/accounting/services/data-resources';
import {
  ADVANCES_RESOURCE,
  EMPLOYEES_RESOURCE,
  PAYROLL_RESOURCE,
  SALARY_PAYMENTS_RESOURCE,
} from '@/features/employees/services/data-resources';
import { SYSTEM_RESOURCE } from '@/features/settings/services/data-resources';
export const DATA_RESOURCES = [
  EMPLOYEES_RESOURCE,
  PAYROLL_RESOURCE,
  SALARY_PAYMENTS_RESOURCE,
  ADVANCES_RESOURCE,
  JOURNALS_RESOURCE,
  CURRENCIES_RESOURCE,
  CASH_RESOURCE,
  ACCOUNTS_RESOURCE,
  SYSTEM_RESOURCE,
];
export function useEmployeesData() {
  return useFeatureResources(DATA_RESOURCES);
}
