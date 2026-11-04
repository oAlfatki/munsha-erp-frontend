import type { Invoice } from '@/features/trade/public/types/models/Invoice';
export interface InvoiceDetailsProps {
  current: Invoice & {
    isReturn?: boolean;
  };
  browse: Invoice[];
  isDeepLink: boolean;
  setDetail: (id: string | null) => void;
  setEditor: (invoice: Invoice | null | undefined) => void;
  isConfirm: boolean;
  setConfirm: (isValue: boolean) => void;
  csv: (documents: Invoice[]) => void;
}
