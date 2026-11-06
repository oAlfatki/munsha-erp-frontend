import { apiClient } from '@/core/api/apiClient';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import type { SaveMasterRequest } from '@/features/ledger/public';
import { ENDPOINTS } from '@/features/master-data/api/endpoints';

export const submitMaster = async (
  data: SaveMasterRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'master'), {
    ...context,
    type: 'master',
    data: data,
  });
};
