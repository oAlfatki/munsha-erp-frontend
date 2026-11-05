import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { AdvancesReportRow } from '@/features/personnel/types/responses/AdvancesReportRow';
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
