import type { Party } from '@/features/parties/public';
import type { Invoice } from '@/features/trade/types/models/Invoice';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface InvoiceLookupReadModel {
  invoices: Invoice[];
  parties: Party[];
}
