import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { AssetResponse } from '@/features/accounting/types/responses/AssetResponse';
export type AssetListResponse = {
  items: Array<AssetResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
