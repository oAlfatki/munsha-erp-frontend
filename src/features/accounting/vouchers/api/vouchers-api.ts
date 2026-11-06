import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import type { SaveVoucherRequest } from '@/features/ledger/public';
export const submitVoucher = async (
  data: SaveVoucherRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'voucher'), {
    ...context,
    type: 'voucher',
    data: data,
  });
};
