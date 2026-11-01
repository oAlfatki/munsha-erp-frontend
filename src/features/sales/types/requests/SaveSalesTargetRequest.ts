export type SaveSalesTargetRequest = {
  branchId: string;
  period: string;
  employee?: string;
  amount: number;
  note: string;
};
