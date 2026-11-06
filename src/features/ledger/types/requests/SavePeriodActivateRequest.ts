export type SavePeriodActivateRequest = {
  id: string;
  kind?: 'stock' | 'accounts';
  date?: string;
  confirmed?: boolean;
};
