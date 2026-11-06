import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { ContactResponse } from '@/features/ledger/types/responses/ContactResponse';

export type ContactListResponse = {
  items: Array<ContactResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
