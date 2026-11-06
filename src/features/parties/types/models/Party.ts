export interface Party {
  groupId?: string;
  id: string;
  kind: 'customer' | 'supplier';
  name: string;
  address: string;
  phone: string;
  currency: string;
  priceType: 'retail' | 'wholesale';
  limit: number;
  active: boolean;
}
