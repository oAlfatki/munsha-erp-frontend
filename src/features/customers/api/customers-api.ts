import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import type { SaveCustomerRequest } from '@/features/customers/types/requests/SaveCustomerRequest';
export async function submitCustomer(
  data: SaveCustomerRequest,
  context: CommandContext,
): Promise<CommandReceipt> {
  return await apiClient.post<CommandReceipt>(ENDPOINTS.command('parties', 'party'), {
    ...context,
    type: 'party',
    data: data,
  });
}
