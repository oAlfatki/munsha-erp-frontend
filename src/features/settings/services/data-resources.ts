import { collection, singleton } from '@/core/query/resources';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import {
  fetchBranches,
  fetchSettingsBackupPolicy,
  fetchSettingsBranding,
  fetchSettingsCompany,
  fetchSettingsSystem,
} from '@/features/settings/api/read-api';
export const BRANCHES_RESOURCE = collection(
  'settings',
  'branches',
  fetchBranches,
  (items) => ({ branches: items }) as Partial<ErpReadModel>,
);
export const COMPANY_RESOURCE = singleton('settings', 'company', fetchSettingsCompany, (value) => ({
  organization: value,
}));
export const BRANDING_RESOURCE = singleton(
  'settings',
  'branding',
  fetchSettingsBranding,
  (value) => ({ branding: value }),
);
export const SYSTEM_RESOURCE = singleton('settings', 'system', fetchSettingsSystem, (value) => ({
  systemSettings: value as ErpReadModel['systemSettings'],
  extras: {
    records: {},
    operations: [],
    drafts: {},
    preferences: {
      defaultProfit: String(value.inventory.profit),
      defaultDiscount: String(value.inventory.discount),
      defaultPrice: value.sales.defaultPrice,
    },
  },
}));
export const BACKUP_POLICY_RESOURCE = singleton(
  'settings',
  'backupPolicy',
  fetchSettingsBackupPolicy,
  (value) => ({ backupSettings: value }),
);
