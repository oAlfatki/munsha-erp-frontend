export type SalesTargetResponse = {
  id: string;
  name: string;
  active: boolean;
  branchId?: string;
  employeeId?: string;
  period?: string;
  amount?: number;
  [key: string]: string | number | boolean | undefined;
};
