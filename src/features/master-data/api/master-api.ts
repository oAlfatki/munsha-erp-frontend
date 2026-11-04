import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import { requireCommandApi } from '@/core/api/require-api-mode';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveMasterRequest } from '@/features/ledger/public/types/requests/SaveMasterRequest';
export const submitMaster = async (
  data: SaveMasterRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  requireCommandApi();
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'master'), {
    ...context,
    type: 'master',
    data: data,
  });
};
