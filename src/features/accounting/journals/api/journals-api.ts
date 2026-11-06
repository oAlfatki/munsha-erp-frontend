import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import type { SaveManualJournalRequest } from '@/features/ledger/public';
export const submitManualJournal = async (
  data: SaveManualJournalRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'manualJournal'), {
    ...context,
    type: 'manualJournal',
    data: data,
  });
};
