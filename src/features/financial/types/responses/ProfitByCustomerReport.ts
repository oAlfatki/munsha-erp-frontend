import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { ProfitByCustomerReportRow } from '@/features/financial/types/responses/ProfitByCustomerReportRow';
export type ProfitByCustomerReport = {
  columns: Array<string>;
  rows: Array<ProfitByCustomerReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
