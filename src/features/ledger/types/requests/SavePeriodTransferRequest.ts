export type SavePeriodTransferRequest = {
  id: string;
  kind?: 'stock' | 'accounts';
  date?: string;
  confirmed?: boolean;
};
