import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
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
