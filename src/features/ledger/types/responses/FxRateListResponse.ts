import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { FxRateResponse } from '@/features/ledger/types/responses/FxRateResponse';
export type FxRateListResponse = {
  items: Array<FxRateResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
