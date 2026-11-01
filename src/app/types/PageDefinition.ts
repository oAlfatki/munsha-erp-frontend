import type { FieldDef } from '@/core/types/FieldDef';
import type { SettingsTab } from '@/features/settings/types/models/SettingsTab';
export type PageDefinition = {
  id: string;
  module: string;
  title: string;
  page: number;
  settingsTab?: SettingsTab;
  navModule?: string;
  mode:
    | 'prices'
    | 'systemSettings'
    | 'master'
    | 'report'
    | 'operation'
    | 'workflow'
    | 'journal'
    | 'backup'
    | 'import'
    | 'permissions'
    | 'currency'
    | 'locations'
    | 'stockDoc'
    | 'statement'
    | 'assets'
    | 'financial'
    | 'expenseUnified'
    | 'branding'
    | 'annualSettings'
    | 'business'
    | 'closingBalances'
    | 'returnInvoice'
    | 'inventoryCost'
    | 'configuration'
    | 'salesTargets'
    | 'masterImport'
    | 'backups'
    | 'serviceStatus'
    | 'contactsLedger';
  documentKind?: 'opening' | 'transfer' | 'adjustment';
  collection?: string;
  report?: string;
  operation?: string;
  fields?: FieldDef[];
  note?: string;
};
