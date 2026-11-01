export type ImportMastersRequest = {
  kind: 'customer' | 'supplier' | 'product';
  rows: Record<string, string>[];
};
