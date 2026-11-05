import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveSupplierRequest } from '@/features/suppliers/types/requests/SaveSupplierRequest';
export async function submitSupplier(
  data: SaveSupplierRequest,
  context: CommandContext,
): Promise<CommandReceipt> {
  return await apiClient.post<CommandReceipt>(ENDPOINTS.command('parties', 'party'), {
    ...context,
    type: 'party',
    data: data,
  });
}
