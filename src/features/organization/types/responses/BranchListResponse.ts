import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { BranchResponse } from '@/features/organization/types/responses/BranchResponse';
export type BranchListResponse = {
  items: Array<BranchResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
