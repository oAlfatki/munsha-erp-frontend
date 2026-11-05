import type { Product } from '@/features/stock/public';
export type ItemMatch = {
  product: Product;
  unit: number;
  barcode: boolean;
};
