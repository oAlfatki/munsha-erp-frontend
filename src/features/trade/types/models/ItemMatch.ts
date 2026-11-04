import type { Product } from '@/features/stock/public/types/models/Product';
export type ItemMatch = {
  product: Product;
  unit: number;
  barcode: boolean;
};
