import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { CustomerBalancesReportRow } from '@/features/reports/types/responses/CustomerBalancesReportRow';
export type CustomerBalancesReport = {
  columns: Array<string>;
  rows: Array<CustomerBalancesReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
