import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
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
