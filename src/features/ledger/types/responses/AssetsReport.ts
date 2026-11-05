import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { AssetsReportRow } from '@/features/ledger/types/responses/AssetsReportRow';
export type AssetsReport = {
  columns: Array<string>;
  rows: Array<AssetsReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
