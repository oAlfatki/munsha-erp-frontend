import type { InvoiceLine } from '@/features/trade/types/models/InvoiceLine';
export interface InvoiceTotalsProps {
  lines: InvoiceLine[];
  payment: 'cash' | 'credit' | 'mixed';
  paid?: number;
  taxRate?: number;
  invoiceDiscount?: number;
  currency: string;
}
