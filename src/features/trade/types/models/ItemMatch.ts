import type { ErpReadModel } from '@/core/types/ErpReadModel';
export type ItemMatch = {
  product: ErpReadModel['products'][number];
  unit: number;
  barcode: boolean;
};
