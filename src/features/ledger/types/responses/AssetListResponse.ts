import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { AssetResponse } from '@/features/ledger/types/responses/AssetResponse';
export type AssetListResponse = {
  items: Array<AssetResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
