import type { Branch } from "@/features/settings/public/types/models/Branch";
import type { Invoice } from "@/features/trade/public/types/models/Invoice";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface CurrencyDocumentsReportReadModel {
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
  invoices: Invoice[];
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
