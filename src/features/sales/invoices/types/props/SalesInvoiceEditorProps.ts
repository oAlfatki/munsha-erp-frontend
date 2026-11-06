import type { Invoice } from '@/features/trade/public';

export interface SalesInvoiceEditorProps {
  invoice: Invoice | null;
  onClose: () => void;
  onLoad: (invoice: Invoice) => void;
  onNew: () => void;
}
