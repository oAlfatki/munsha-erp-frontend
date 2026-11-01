export type SavePeriodResetRequest = {
  id: string;
  kind?: 'stock' | 'accounts';
  date?: string;
  confirmed?: boolean;
};
