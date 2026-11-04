import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { VoucherResponse } from '@/features/ledger/types/responses/VoucherResponse';
export type VoucherListResponse = {
  items: Array<VoucherResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
