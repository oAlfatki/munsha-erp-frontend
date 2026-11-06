import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
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
