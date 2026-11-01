export interface CostFilters {
  from: string;
  to: string;
  warehouse: string;
  group: string;
  product: string;
  excludeZero: boolean;
  priceType: 'retail' | 'wholesale';
}
