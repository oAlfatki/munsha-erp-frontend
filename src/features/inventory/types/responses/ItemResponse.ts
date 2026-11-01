export type ItemResponse = {
  id: string;
  code: string;
  name: string;
  category: 1 | 2 | 3;
  units: Array<{
    name: string;
    factor: number;
    purchase: number;
    retail: number;
    wholesale: number;
    barcode: string;
    [key: string]: unknown;
  }>;
  min: number;
  maxDiscount: number;
  alert: boolean;
  active: boolean;
  [key: string]: unknown;
};
