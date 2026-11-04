import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Stock } from "@/features/inventory/public/types/models/Stock";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Party } from "@/features/parties/public/types/models/Party";
import type { Branch } from "@/features/settings/public/types/models/Branch";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface PurchaseInvoiceEditorReadModel {
  parties: Party[];
  invoices: Invoice[];
  branches: Branch[];
  warehouses: Warehouse[];
  products: Product[];
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
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
  entries: Entry[];
  systemSettings?: PersistedSystemSettings;
  extras?: ExtensionData;
  invoiceReturns?: (Invoice & {
    sourceId: string;
    sourceLines: number[];
    adjusted?: boolean;
    baseSubtotal?: number;
    baseTax?: number;
    baseTotal?: number;
    basePaid?: number;
  })[];
  stocks: Stock[];
}
