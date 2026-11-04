import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { StockDocument } from "@/features/inventory/public/types/models/StockDocument";
import type { Branch } from "@/features/settings/public/types/models/Branch";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface OpeningAccountBalancesReportReadModel {
  entries: Entry[];
  stockDocuments?: StockDocument[];
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
  branches: Branch[];
}
