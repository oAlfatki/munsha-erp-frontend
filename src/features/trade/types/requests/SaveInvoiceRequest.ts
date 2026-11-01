export type SaveInvoiceRequest = {
  id?: string;
  kind: 'sale' | 'purchase';
  date: string;
  branchId: string;
  warehouseId: string;
  partyId: string;
  currency: string;
  rate: number;
  payment: 'cash' | 'credit' | 'mixed';
  invoiceDiscount?: number;
  paid?: number;
  taxRate?: number;
  priceType: 'retail' | 'wholesale';
  status: 'draft' | 'final';
  note: string;
  cashId?: string;
  supplierNumber?: string;
  lines: {
    productId: string;
    unit: number;
    qty: number;
    free: number;
    price: number;
    discount: number;
  }[];
};
