import type { CommandContext } from '@/core/types/CommandContext';
import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { submitCustomer } from '@/features/customers/api/customers-api';
import { mapCustomerInput } from '@/features/customers/mapper/customers-mapper';

export async function saveCustomer(
  input: unknown,
  context: CommandContext,
): Promise<CommandReceipt> {
  return await submitCustomer(mapCustomerInput(input), context);
}
/** Keep the existing workspace contract until granular reads are implemented by the backend. */
