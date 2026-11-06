import type { Invoice } from '@/features/trade/public';

export interface BuildCurrencyDocumentsReportContext {
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
  invoices: Invoice[];
}
