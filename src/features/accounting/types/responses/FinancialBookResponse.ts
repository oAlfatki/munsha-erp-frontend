export type FinancialBookResponse = {
  id: string;
  name: string;
  year: number;
  status: 'current' | 'preparing' | 'closed';
  [key: string]: unknown;
};
