import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { BranchResponse } from '@/features/settings/types/responses/BranchResponse';
export type BranchListResponse = {
  items: Array<BranchResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
