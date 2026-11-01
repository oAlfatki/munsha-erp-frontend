import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { InvoiceLine } from '@/features/trade/types/models/InvoiceLine';
export interface InvoiceLineGridProps {
  state: ErpReadModel;
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
