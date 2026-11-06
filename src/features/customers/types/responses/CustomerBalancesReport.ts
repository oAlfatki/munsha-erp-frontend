import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { CustomerBalancesReportRow } from '@/features/customers/types/responses/CustomerBalancesReportRow';
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
