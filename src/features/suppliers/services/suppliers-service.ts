import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import { submitSupplier } from '@/features/suppliers/api/suppliers-api';
import { mapSupplierInput } from '@/features/suppliers/mappers/suppliers-mapper';

export async function saveSupplier(
  input: unknown,
  context: CommandContext,
): Promise<CommandReceipt> {

  return await submitSupplier(mapSupplierInput(input), context);
}
