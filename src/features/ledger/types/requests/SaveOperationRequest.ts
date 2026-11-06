export type SaveOperationRequest = {
  kind:
    | 'payroll'
    | 'salaryPayment'
    | 'advance'
    | 'count'
    | 'adjustment'
    | 'assetPurchase'
    | 'depreciation'
    | 'accruedExpense'
    | 'settleExpense'
    | 'prepaidExpense'
    | 'consumePrepaid';
  date: string;
  branchId: string;
  subject: string;
  amount?: number;
  note: string;
  source?: string;
  period?: string;
  qty?: number;
  warehouseId?: string;
};
