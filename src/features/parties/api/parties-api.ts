import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import { requireCommandApi } from '@/core/api/require-api-mode';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SavePartyRequest } from '@/features/parties/public/types/requests/SavePartyRequest';
export const submitParty = async (
  data: SavePartyRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  requireCommandApi();
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('parties', 'party'), {
    ...context,
    type: 'party',
    data: data,
  });
};
