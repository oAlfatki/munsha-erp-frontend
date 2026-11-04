export type SaveStockDocumentRequest = {
  openingScope?: 'accounts' | 'stock';
  openingOffsetAccount?: string;
  id?: string;
  kind: 'opening' | 'transfer' | 'adjustment';
  status: 'draft' | 'final';
  date: string;
  branchId: string;
  warehouseId: string;
  toWarehouseId?: string;
  currency: string;
  rate: number;
  direction?: 'shortage' | 'excess';
  note: string;
  lines: {
    productId: string;
    unit: number;
    qty: number;
    price: number;
    expectedQty?: number;
  }[];
  accounts: {
    account: string;
    partyId?: string;
    debit: number;
    credit: number;
    description: string;
  }[];
};
