import type { Invoice } from '@/features/trade/public/types/models/Invoice';
export interface SalesInvoiceEditorProps {
  invoice: Invoice | null;
  onClose: () => void;
  onLoad: (invoice: Invoice) => void;
  onNew: () => void;
}
