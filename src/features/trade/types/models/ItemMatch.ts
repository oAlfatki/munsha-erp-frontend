import type { Product } from "@/features/inventory/public/types/models/Product";
export type ItemMatch = {
  product: Product;
  unit: number;
  barcode: boolean;
};
