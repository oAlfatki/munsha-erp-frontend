import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { AdvancesReportRow } from '@/features/employees/types/responses/AdvancesReportRow';
export type AdvancesReport = {
  columns: Array<string>;
  rows: Array<AdvancesReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
