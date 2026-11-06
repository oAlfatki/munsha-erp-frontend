import { pathSegment } from '@/core/api/path-segment';

export const ENDPOINTS = {
  fetchBackups: '/backups',

  submitBackupAction: (action: 'create' | 'restore' | 'download' | 'auto') => '/backups/' + action,

  fetchBranches: `/branches`,

  fetchBranchesById: (id: string) => `/branches/${pathSegment(id)}`,

  fetchSettingsCompany: `/settings/company`,
  fetchSettingsBranding: `/settings/branding`,
  fetchSettingsSystem: `/settings/system`,
  fetchSettingsBackupPolicy: `/settings/backup-policy`,
  fetchSettingsSystemAccounting: `/settings/system/accounting`,
  fetchSettingsSystemSales: `/settings/system/sales`,
  fetchSettingsSystemPurchases: `/settings/system/purchases`,
  fetchSettingsSystemInventory: `/settings/system/inventory`,
  fetchSettingsSystemExpenses: `/settings/system/expenses`,
  fetchSettingsSystemDocuments: `/settings/system/documents`,
  fetchSettingsSystemBranches: `/settings/system/branches`,
  fetchSettingsSystemCompany: `/settings/system/company`,
  fetchSettingsServiceStatus: `/settings/service-status`,

  fetchSettingsImportTemplatesByKind: (kind: string) =>
    `/settings/import-templates/${pathSegment(kind)}`,

  fetchUiDraftsByKey: (key: string) => `/ui-drafts/${pathSegment(key)}`,

  fetchLookupsByResource: (resource: string) => `/lookups/${pathSegment(resource)}`,
} as const;
