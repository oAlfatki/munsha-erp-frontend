export type StockDocumentResponse = {
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
  total: number;
  createdAt: string;
  lines: Array<{
    productId: string;
    unit: number;
    qty: number;
    price: number;
    expectedQty?: number;
    value?: number;
    [key: string]: unknown;
  }>;
  accounts: Array<{
    account: string;
    partyId: string;
    debit: number;
    credit: number;
    description: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
};
