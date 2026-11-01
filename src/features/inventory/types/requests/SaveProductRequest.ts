export type SaveProductRequest = {
  id?: string;
  name: string;
  groupId?: string;
  category: 1 | 2 | 3;
  min: number;
  alert: boolean;
  active: boolean;
  maxDiscount: number;
  units: {
    name: string;
    factor: number;
    purchase: number;
    retail: number;
    wholesale: number;
    barcode: string;
  }[];
};
