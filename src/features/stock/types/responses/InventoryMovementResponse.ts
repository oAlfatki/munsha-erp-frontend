export type InventoryMovementResponse = {
  id: string;
  reference: string;
  date: string;
  productId: string;
  warehouseId: string;
  qty: number;
  value: number;
  kind: string;
  [key: string]: unknown;
};
