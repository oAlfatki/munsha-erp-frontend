import { postCommand } from '@/core/services/http/command-api';
import type { CommandContext } from '@/core/types/CommandContext';
import type { CommandReceipt } from '@/core/types/CommandReceipt';
import type { SaveSupplierRequest } from '@/features/suppliers/types/requests/SaveSupplierRequest';
export async function submitSupplier(
  data: SaveSupplierRequest,
  context: CommandContext,
): Promise<CommandReceipt> {
  return await postCommand('parties', 'party', data, context);
}
