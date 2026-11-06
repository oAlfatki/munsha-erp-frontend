import { apiClient } from '@/core/api/apiClient';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import { ENDPOINTS } from '@/features/sales/api/endpoints';
import type { SaveSalesInvoiceRequest } from '@/features/sales/invoices/types/requests/SaveSalesInvoiceRequest';
import type { SaveSalesTargetRequest } from '@/features/sales/targets/types/requests/SaveSalesTargetRequest';

export const submitSalesTarget = async (
  data: SaveSalesTargetRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

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

  return await apiClient.post<CommandReceipt>(ENDPOINTS.command('trade', 'invoice'), {
    ...context,
    type: 'invoice',
    data: data,
  });
}
