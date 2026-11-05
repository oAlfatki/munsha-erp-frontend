import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { RecognizedExpensesReportRow } from '@/features/expenses/types/responses/RecognizedExpensesReportRow';
export type RecognizedExpensesReport = {
  columns: Array<string>;
  rows: Array<RecognizedExpensesReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
