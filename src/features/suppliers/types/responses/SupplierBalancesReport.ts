import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { SupplierBalancesReportRow } from '@/features/suppliers/types/responses/SupplierBalancesReportRow';
export type SupplierBalancesReport = {
  columns: Array<string>;
  rows: Array<SupplierBalancesReportRow>;
  pagination: ReadPagination;
  scope: ReadScope;
  totals?: {
    baseAmount?: number;
  };
  note: string;
};
