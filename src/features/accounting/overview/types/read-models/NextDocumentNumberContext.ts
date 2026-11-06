import type { Entry, ExtensionData } from '@/features/ledger/public';
import type { Branch, PersistedSystemSettings } from '@/features/organization/public';
import type { StockDocument, Warehouse } from '@/features/stock/public';
import type { Invoice } from '@/features/trade/public';
import type { Audit } from '@/features/users/public';
export interface NextDocumentNumberContext {
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
  documentCounters?: Record<string, number>;
  entries: Entry[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
  warehouses: Warehouse[];
  branches: Branch[];
  invoices: Invoice[];
  stockDocuments?: StockDocument[];
  audit: Audit[];
}
