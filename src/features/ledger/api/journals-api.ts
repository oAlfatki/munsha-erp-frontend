import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { GetAccountingJournalsByIdRequest } from '@/features/ledger/types/requests/GetAccountingJournalsByIdRequest';
import type { SearchAccountingJournalsRequest } from '@/features/ledger/types/requests/SearchAccountingJournalsRequest';
import type { JournalEntryListResponse } from '@/features/ledger/types/responses/JournalEntryListResponse';
import type { JournalEntryResponse } from '@/features/ledger/types/responses/JournalEntryResponse';
export async function fetchAccountingJournals(
  params: SearchAccountingJournalsRequest = {},
  signal?: AbortSignal,
): Promise<JournalEntryListResponse> {
  return await apiClient.get<JournalEntryListResponse>(ENDPOINTS.fetchAccountingJournals, {
    signal,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      accountCode: params.accountCode,
      partyId: params.partyId,
      reference: params.reference,
    },
  });
}
export async function fetchAccountingJournalsById(
  params: GetAccountingJournalsByIdRequest,
): Promise<JournalEntryResponse> {
  return await apiClient.get<JournalEntryResponse>(
    ENDPOINTS.fetchAccountingJournalsById(params.id),
    { params: { bookId: params.bookId, branchId: params.branchId } },
  );
}
