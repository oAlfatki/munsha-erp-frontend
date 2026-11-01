import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { CashAccountResponse } from '@/features/accounting/types/responses/CashAccountResponse';
export type CashAccountListResponse = {
  items: Array<CashAccountResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
