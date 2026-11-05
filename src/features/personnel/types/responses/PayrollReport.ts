import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { PayrollReportRow } from '@/features/personnel/types/responses/PayrollReportRow';
export type PayrollReport = {
  columns: Array<string>;
  rows: Array<PayrollReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
