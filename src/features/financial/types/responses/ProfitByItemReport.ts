import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
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
