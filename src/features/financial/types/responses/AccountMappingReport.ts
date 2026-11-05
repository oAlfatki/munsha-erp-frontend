import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
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
