import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { CurrencyResponse } from '@/features/ledger/types/responses/CurrencyResponse';
export type CurrencyListResponse = {
  items: Array<CurrencyResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
