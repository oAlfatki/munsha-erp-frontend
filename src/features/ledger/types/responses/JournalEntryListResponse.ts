import type { ReadPagination } from '@/core/types/api/ReadPagination';
import type { ReadScope } from '@/core/types/api/ReadScope';
import type { JournalEntryResponse } from '@/features/ledger/types/responses/JournalEntryResponse';

export type JournalEntryListResponse = {
  items: Array<JournalEntryResponse>;
  pagination: ReadPagination;
  scope: ReadScope;
};
