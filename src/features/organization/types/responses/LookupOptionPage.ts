import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { LookupOption } from '@/features/organization/types/responses/LookupOption';
export type LookupOptionPage = {
  items: Array<LookupOption>;
  pagination: ReadPagination;
  scope: ReadScope;
};
