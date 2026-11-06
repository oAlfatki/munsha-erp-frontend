import { apiClient } from '@/core/api/apiClient';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import { ENDPOINTS } from '@/features/accounting/api/endpoints';
import type { SaveOperationRequest } from '@/features/ledger/public';

export const submitOperation = async (
  data: SaveOperationRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'operation'), {
    ...context,
    type: 'operation',
    data: data,
  });
};
