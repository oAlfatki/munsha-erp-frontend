import { ROUTES } from '@/core/config/navigation-paths';
import type { RouteObject } from 'react-router-dom';
export const SETTINGS_ROUTES: RouteObject[] = [
  {
    path: ROUTES.SETTINGS,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/SettingsOverviewPage')).default,
    }),
    handle: { module: 'settings', title: '' },
  },
  {
    path: ROUTES.SETTINGS_ANNUAL_BOOKS,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/FinancialBooksPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إنشاء الفترة المالية وترحيل الأرصدة',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_BACKUP,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/BackupListPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'النسخ الاحتياطي',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_BACKUP_POLICY,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/BackupPolicyPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات النسخ الاحتياطي',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_BRANCHES,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/BranchListPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'بطاقات الفروع ومواقع التشغيل',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_BRANDING,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/CompanySettingsPage')).default,
    }),
    handle: { module: 'settings', title: '' },
  },
  {
    path: ROUTES.SETTINGS_BUSINESS,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/CompanySettingsPage')).default,
    }),
    handle: { module: 'settings', title: '' },
  },
  {
    path: ROUTES.SETTINGS_DATABASE,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/DatabaseStatusPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'حالة الاتصال بقاعدة البيانات',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_GENERAL,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/GeneralSettingsPage')).default,
    }),
    handle: { module: 'settings', title: '' },
  },
  {
    path: ROUTES.SETTINGS_MIGRATION,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/ImportMasterDataPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'استيراد البطاقات من CSV',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_RESTORE,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/RestoreBackupPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'استرجاع نسخة احتياطية',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_SYNC,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/DatabaseStatusPage')).default,
    }),
    handle: { module: 'settings', title: '' },
  },
  {
    path: ROUTES.SETTINGS_SYSTEM_ACCOUNTING,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/AccountingSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المحاسبة والضرائب',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_SYSTEM_BRANCHES,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/BranchesSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات الفروع',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_SYSTEM_COMPANY,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/CompanySettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المنشأة',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_SYSTEM_DOCUMENTS,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/DocumentsSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المستندات والترقيم',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_SYSTEM_EXPENSES,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/ExpensesSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المصروفات والسندات',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_SYSTEM_GENERAL,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/GeneralSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'الإعدادات العامة',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_SYSTEM_INVENTORY,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/InventorySettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المخزون',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_SYSTEM_PRINTING,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/PrintingSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات الطباعة',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_SYSTEM_PURCHASES,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/PurchasesSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المشتريات',
      navModule: 'settings',
    },
  },
  {
    path: ROUTES.SETTINGS_SYSTEM_SALES,
    lazy: async () => ({
      Component: (await import('@/features/settings/pages/SalesSettingsPage')).default,
    }),
    handle: {
      module: 'settings',
      title: 'إعدادات المبيعات',
      navModule: 'settings',
    },
  },
];
