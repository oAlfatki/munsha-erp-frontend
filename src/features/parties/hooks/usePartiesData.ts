import { useFeatureResources } from '@/core/hooks/useFeatureResources';
import {
  ACCOUNTS_RESOURCE,
  CASH_RESOURCE,
  CURRENCIES_RESOURCE,
  JOURNALS_RESOURCE,
} from '@/features/accounting/services/data-resources';
import { CUSTOMERS_RESOURCE } from '@/features/customers/services/data-resources';
import { PARTY_GROUPS_RESOURCE } from '@/features/parties/services/data-resources';
import { SYSTEM_RESOURCE } from '@/features/settings/services/data-resources';
import { SUPPLIERS_RESOURCE } from '@/features/suppliers/services/data-resources';
export const DATA_RESOURCES = [
  CUSTOMERS_RESOURCE,
  SUPPLIERS_RESOURCE,
  PARTY_GROUPS_RESOURCE,
  JOURNALS_RESOURCE,
  CURRENCIES_RESOURCE,
  SYSTEM_RESOURCE,
  ACCOUNTS_RESOURCE,
  CASH_RESOURCE,
];
export function usePartiesData() {
  return useFeatureResources(DATA_RESOURCES);
}
