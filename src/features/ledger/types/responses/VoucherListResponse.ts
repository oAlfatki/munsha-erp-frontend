import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { VoucherResponse } from '@/features/ledger/types/responses/VoucherResponse';

export type VoucherListResponse = {
  items: Array<VoucherResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
