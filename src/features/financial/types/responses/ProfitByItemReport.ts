import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { ProfitByItemReportRow } from '@/features/financial/types/responses/ProfitByItemReportRow';
export type ProfitByItemReport = {
  columns: Array<string>;
  rows: Array<ProfitByItemReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
