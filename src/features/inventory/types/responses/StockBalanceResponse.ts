export type StockBalanceResponse = {
  productId: string;
  warehouseId: string;
  qty: number;
  value: number;
  [key: string]: unknown;
};
