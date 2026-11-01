export type SavePriceListRequest = {
  priceType: 'retail' | 'wholesale';
  rows: {
    productId: string;
    unit: number;
    expectedPrice: number;
    expectedFactor: number;
    price: number;
  }[];
};
