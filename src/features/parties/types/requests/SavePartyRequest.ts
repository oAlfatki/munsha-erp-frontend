export type SavePartyRequest = {
  id?: string;
  kind: 'customer' | 'supplier';
  groupId?: string;
  name: string;
  address: string;
  phone: string;
  currency: string;
  priceType: 'retail' | 'wholesale';
  limit: number;
  active: boolean;
};
