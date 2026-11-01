import type { ReadScope } from '@/core/types/ReadScope';
import type { FinancialLineResponse } from '@/features/financial/types/responses/FinancialLineResponse';
export type IncomeStatementResponse = {
  lines: Array<FinancialLineResponse>;
  revenue: number;
  costOfSales: number;
  expenses: number;
  netIncome: number;
  scope: ReadScope;
};
