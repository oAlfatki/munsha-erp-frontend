import { postCommand } from '@/core/services/http/command-api';
import type { CommandContext } from '@/core/types/CommandContext';
import type { CommandReceipt } from '@/core/types/CommandReceipt';
import type { SaveCustomerRequest } from '@/features/customers/types/requests/SaveCustomerRequest';
export async function submitCustomer(
  data: SaveCustomerRequest,
  context: CommandContext,
): Promise<CommandReceipt> {
  return await postCommand('parties', 'party', data, context);
}
