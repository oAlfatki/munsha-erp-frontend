import type { Unit } from '@/features/stock/public/types/models/Unit';
export interface Product {
  id: string;
  code: string;
  name: string;
  category: 1 | 2 | 3;
  groupId?: string;
  units: Unit[];
  min: number;
  alert: boolean;
  maxDiscount: number;
  active: boolean;
}
