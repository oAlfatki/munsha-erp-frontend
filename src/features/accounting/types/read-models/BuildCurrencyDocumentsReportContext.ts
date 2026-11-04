import type { Invoice } from "@/features/trade/public/types/models/Invoice";
export interface BuildCurrencyDocumentsReportContext {
currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
invoices: Invoice[];
}
