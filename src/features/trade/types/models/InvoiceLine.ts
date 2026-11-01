export interface InvoiceLine {
  sourceInvoiceDiscount?: number;
  invoiceDiscount?: number;
  productId: string;
  unit: number;
  qty: number;
  free: number;
  price: number;
  discount: number;
  cost: number;
}
