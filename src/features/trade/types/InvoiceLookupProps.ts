import type { Invoice } from '@/features/trade/public/types/models/Invoice';
export interface InvoiceLookupProps {
  kind: Invoice['kind'];
  onSelect: (invoice: Invoice) => void;
}
