import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { CurrencyResponse } from '@/features/accounting/types/responses/CurrencyResponse';
export type CurrencyListResponse = {
  items: Array<CurrencyResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
