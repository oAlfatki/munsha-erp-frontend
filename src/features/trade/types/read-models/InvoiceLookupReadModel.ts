import type { Party } from '@/features/parties/public/types/models/Party';
import type { Invoice } from '@/features/trade/public/types/models/Invoice';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface InvoiceLookupReadModel {
  invoices: Invoice[];
  parties: Party[];
}
