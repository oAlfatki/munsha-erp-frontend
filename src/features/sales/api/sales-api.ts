import { postCommand } from '@/core/services/http/command-api';
import type { CommandContext } from '@/core/types/CommandContext';
import type { CommandReceipt } from '@/core/types/CommandReceipt';
import type { SaveSalesInvoiceRequest } from '@/features/sales/types/requests/SaveSalesInvoiceRequest';
import type { SaveSalesTargetRequest } from '@/features/sales/types/requests/SaveSalesTargetRequest';
export const submitSalesTarget = async (
  data: SaveSalesTargetRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('sales', 'salesTarget', data, context);

export async function submitSalesInvoice(
  data: SaveSalesInvoiceRequest,
  context: CommandContext,
): Promise<CommandReceipt> {
  return await postCommand('trade', 'invoice', data, context);
}
