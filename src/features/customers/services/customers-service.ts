import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import { submitCustomer } from '@/features/customers/api/customers-api';
import { mapCustomerInput } from '@/features/customers/mappers/customers-mapper';

export async function saveCustomer(
  input: unknown,
  context: CommandContext,
): Promise<CommandReceipt> {

  return await submitCustomer(mapCustomerInput(input), context);
}
