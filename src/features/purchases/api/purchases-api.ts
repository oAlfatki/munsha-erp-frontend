import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SavePurchaseInvoiceRequest } from '@/features/purchases/types/requests/SavePurchaseInvoiceRequest';
export async function submitPurchaseInvoice(
  data: SavePurchaseInvoiceRequest,
  context: CommandContext,
): Promise<CommandReceipt> {
  return await apiClient.post<CommandReceipt>(ENDPOINTS.command('trade', 'invoice'), {
    ...context,
    type: 'invoice',
    data: data,
  });
}
