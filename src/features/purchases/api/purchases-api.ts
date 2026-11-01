import { postCommand } from '@/core/services/http/command-api';
import type { CommandContext } from '@/core/types/CommandContext';
import type { CommandReceipt } from '@/core/types/CommandReceipt';
import type { SavePurchaseInvoiceRequest } from '@/features/purchases/types/requests/SavePurchaseInvoiceRequest';
export async function submitPurchaseInvoice(
  data: SavePurchaseInvoiceRequest,
  context: CommandContext,
): Promise<CommandReceipt> {
  return await postCommand('trade', 'invoice', data, context);
}
