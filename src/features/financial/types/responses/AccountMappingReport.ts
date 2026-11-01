import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { AccountMappingReportRow } from '@/features/financial/types/responses/AccountMappingReportRow';
export type AccountMappingReport = {
  columns: Array<string>;
  rows: Array<AccountMappingReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
