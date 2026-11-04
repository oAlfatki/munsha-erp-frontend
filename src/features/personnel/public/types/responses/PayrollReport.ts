import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
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
