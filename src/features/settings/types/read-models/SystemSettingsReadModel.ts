import type { AnnualBooks } from "@/features/accounting/public/types/models/AnnualBooks";
import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { StockDocument } from "@/features/inventory/public/types/models/StockDocument";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Branch } from "@/features/settings/public/types/models/Branch";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
import type { Audit } from "@/features/users/public/types/models/Audit";
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
  audit: Audit[];
}
