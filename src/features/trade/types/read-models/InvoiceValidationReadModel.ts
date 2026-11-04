import type { AnnualBooks } from "@/features/accounting/public/types/models/AnnualBooks";
import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Movement } from "@/features/inventory/public/types/models/Movement";
import type { Product } from "@/features/inventory/public/types/models/Product";
import type { Stock } from "@/features/inventory/public/types/models/Stock";
import type { Warehouse } from "@/features/inventory/public/types/models/Warehouse";
import type { Party } from "@/features/parties/public/types/models/Party";
import type { PersistedSystemSettings } from "@/features/settings/public/types/models/PersistedSystemSettings";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
export interface InvoiceValidationReadModel {
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
    annualBooks?: AnnualBooks;
    invoices: Invoice[];
    warehouses: Warehouse[];
    systemSettings?: PersistedSystemSettings;
    extras?: ExtensionData;
    currencies: {
        code: string;
        name: string;
        rate: number;
    }[];
    parties: Party[];
    movements: Movement[];
    products: Product[];
    stocks: Stock[];
    entries: Entry[];
}
