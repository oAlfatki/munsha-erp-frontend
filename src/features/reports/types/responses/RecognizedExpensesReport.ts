import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { RecognizedExpensesReportRow } from '@/features/reports/types/responses/RecognizedExpensesReportRow';
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
