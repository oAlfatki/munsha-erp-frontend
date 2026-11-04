import type { InvoiceLine } from "@/features/trade/public/types/models/InvoiceLine";
import type { InvoiceLineGridReadModel } from '@/features/trade/types/read-models/InvoiceLineGridReadModel';
export interface InvoiceLineGridProps {
  state: InvoiceLineGridReadModel;
  lines: InvoiceLine[];
  onChange: (lines: InvoiceLine[]) => void;
  kind: 'sale' | 'purchase';
  priceType: 'retail' | 'wholesale';
  rate: number;
  currency: string;
  warehouseId: string;
  isReadOnly: boolean;
  onAddProduct: () => void;
  onPendingChange: (isV: boolean) => void;
}
