export interface StockClosingContext {
  products: { id: string; code: string; name: string; units: { name: string }[] }[];
  warehouses: { id: string; name: string; branchId: string }[];
  movements: { productId: string; warehouseId: string; date: string; qty: number; value: number }[];
}
