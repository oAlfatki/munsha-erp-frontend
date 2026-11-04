import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { StockDocument } from "@/features/inventory/public/types/models/StockDocument";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Branch } from "@/features/settings/public/types/models/Branch";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
import type { Audit } from "@/features/users/public/types/models/Audit";
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
