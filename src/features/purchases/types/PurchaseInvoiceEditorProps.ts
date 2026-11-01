import type { Invoice } from '@/features/trade/types/models/Invoice';
export interface PurchaseInvoiceEditorProps {
  invoice: Invoice | null;
  onClose: () => void;
  onLoad: (invoice: Invoice) => void;
  onNew: () => void;
}
