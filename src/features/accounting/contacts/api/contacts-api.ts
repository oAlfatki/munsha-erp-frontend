import { apiClient } from '@/core/api/apiClient';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import { ENDPOINTS } from '@/features/accounting/api/endpoints';
import type { SaveContactEntryRequest, SaveContactVoucherRequest } from '@/features/ledger/public';

export const submitContactEntry = async (
  data: SaveContactEntryRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'contactEntry'), {
    ...context,
    type: 'contactEntry',
    data: data,
  });
};

export const submitContactVoucher = async (
  data: SaveContactVoucherRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'contactVoucher'), {
    ...context,
    type: 'contactVoucher',
    data: data,
  });
};
