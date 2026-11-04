import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import { requireCommandApi } from '@/core/api/require-api-mode';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveSalesInvoiceRequest } from '@/features/sales/types/requests/SaveSalesInvoiceRequest';
import type { SaveSalesTargetRequest } from '@/features/sales/types/requests/SaveSalesTargetRequest';
export const submitSalesTarget = async (
  data: SaveSalesTargetRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  requireCommandApi();
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('sales', 'salesTarget'), {
    ...context,
    type: 'salesTarget',
    data: data,
  });
};

export async function submitSalesInvoice(
  data: SaveSalesInvoiceRequest,
  context: CommandContext,
): Promise<CommandReceipt> {
  requireCommandApi();
  return await apiClient.post<CommandReceipt>(ENDPOINTS.command('trade', 'invoice'), {
    ...context,
    type: 'invoice',
    data: data,
  });
}
