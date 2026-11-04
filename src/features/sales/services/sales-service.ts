import type { CommandContext } from '@/core/types/CommandContext';
import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { submitSalesInvoice, submitSalesTarget } from '@/features/sales/api/sales-api';
import { mapSalesInvoiceInput, mapSalesTargetInput } from '@/features/sales/mapper/sales-mapper';
export const saveSalesTarget = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitSalesTarget>>> =>
  submitSalesTarget(mapSalesTargetInput(input), context);

export async function saveSalesInvoice(
  input: unknown,
  context: CommandContext,
): Promise<CommandReceipt> {
  return await submitSalesInvoice(mapSalesInvoiceInput(input), context);
}
