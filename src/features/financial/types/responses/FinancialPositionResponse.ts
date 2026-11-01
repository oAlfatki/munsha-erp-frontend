import type { ReadScope } from '@/core/types/ReadScope';
import type { FinancialLineResponse } from '@/features/financial/types/responses/FinancialLineResponse';
export type FinancialPositionResponse = {
  lines: Array<FinancialLineResponse>;
  assets: number;
  liabilities: number;
  equity: number;
  difference: number;
  scope: ReadScope;
};
