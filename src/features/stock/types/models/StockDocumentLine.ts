export interface StockDocumentLine {
  productId: string;
  unit: number;
  qty: number;
  price: number;
  expectedQty?: number;
  value?: number;
}
