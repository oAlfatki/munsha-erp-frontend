import type { OpeningAccountLine } from '@/features/stock/types/models/OpeningAccountLine';
import type { StockDocumentLine } from '@/features/stock/types/models/StockDocumentLine';
export interface StockDocument {
  openingScope?: 'accounts' | 'stock';
  openingOffsetAccount?: string;
  id: string;
  reference: string;
  kind: 'opening' | 'transfer' | 'adjustment';
  status: 'draft' | 'final';
  date: string;
  branchId: string;
  warehouseId: string;
  toWarehouseId: string;
  currency: string;
  rate: number;
  direction: 'shortage' | 'excess';
  note: string;
  lines: StockDocumentLine[];
  accounts: OpeningAccountLine[];
  total: number;
  createdAt: string;
}
