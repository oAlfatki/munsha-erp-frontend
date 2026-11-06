import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import type { SaveCurrencyRequest } from '@/features/ledger/types/requests/SaveCurrencyRequest';
export const submitCurrency = async (
  data: SaveCurrencyRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('settings', 'currency'), {
    ...context,
    type: 'currency',
    data: data,
  });
};
