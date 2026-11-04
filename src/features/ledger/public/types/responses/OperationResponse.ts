export type OperationResponse = {
  id: string;
  reference: string;
  kind: string;
  date: string;
  branchId: string;
  subject: string;
  amount: number;
  note: string;
  [key: string]: unknown;
};
