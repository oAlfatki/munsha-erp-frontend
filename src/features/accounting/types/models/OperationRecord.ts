export interface OperationRecord {
  id: string;
  reference: string;
  kind: string;
  date: string;
  branchId: string;
  subject: string;
  amount: number;
  note: string;
  source?: string;
  period?: string;
  qty?: number;
  warehouseId?: string;
  paid?: boolean;
}
