import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { LookupOption } from '@/features/organization/types/responses/LookupOption';

export type LookupOptionPage = {
  items: Array<LookupOption>;
  pagination: ReadPagination;
  scope: ReadScope;
};
