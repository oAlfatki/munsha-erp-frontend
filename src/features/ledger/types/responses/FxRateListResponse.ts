import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { FxRateResponse } from '@/features/ledger/types/responses/FxRateResponse';

export type FxRateListResponse = {
  items: Array<FxRateResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
