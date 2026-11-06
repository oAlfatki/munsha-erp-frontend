import type { AnnualBooks, Entry, ExtensionData } from '@/features/ledger/public';
import type { Branch, PersistedSystemSettings } from '@/features/organization/public';
import type { StockDocument, Warehouse } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface SystemSettingsReadModel {
  organization: {
    name: string;
    email?: string;
    activity?: string;
    taxNumber?: string;
    registrationNumber?: string;
    address: string;
    phone: string;
    multiBranch: boolean;
    currency: string;
    year: number;
    costPolicy: 'moving_average';
    policyApproved: boolean;
  };
  branding?: { name: string; tagline: string; color: string; logo: string };
  branches: Branch[];
  warehouses: Warehouse[];
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
  annualBooks?: AnnualBooks;
  documentCounters?: Record<string, number>;
  entries: Entry[];
  invoices: Invoice[];
  stockDocuments?: StockDocument[];
}
