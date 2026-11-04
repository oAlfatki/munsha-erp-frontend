import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import { requireCommandApi } from '@/core/api/require-api-mode';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveCustomerRequest } from '@/features/customers/types/requests/SaveCustomerRequest';
export async function submitCustomer(
  data: SaveCustomerRequest,
  context: CommandContext,
): Promise<CommandReceipt> {
  requireCommandApi();
  return await apiClient.post<CommandReceipt>(ENDPOINTS.command('parties', 'party'), {
    ...context,
    type: 'party',
    data: data,
  });
}
