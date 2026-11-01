import type { ReadPagination } from '@/core/types/ReadPagination';
import type { ReadScope } from '@/core/types/ReadScope';
import type { JournalEntryResponse } from '@/features/accounting/types/responses/JournalEntryResponse';
export type JournalEntryListResponse = {
  items: Array<JournalEntryResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
