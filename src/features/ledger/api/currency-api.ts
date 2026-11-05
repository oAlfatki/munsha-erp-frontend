import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveCurrencyRequest } from '@/features/ledger/public/types/requests/SaveCurrencyRequest';
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
