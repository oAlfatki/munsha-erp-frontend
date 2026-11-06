import { apiClient } from '@/core/api/apiClient';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import { ENDPOINTS } from '@/features/suppliers/api/endpoints';
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
