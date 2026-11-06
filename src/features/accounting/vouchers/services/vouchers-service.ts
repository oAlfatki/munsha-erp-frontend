import type { CommandContext } from '@/core/types/api/CommandContext';
import { submitVoucher } from '@/features/accounting/vouchers/api/vouchers-api';
import { mapVoucherInput } from '@/features/accounting/vouchers/mappers/vouchers-mapper';
export const saveVoucher = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitVoucher>>> =>
  submitVoucher(mapVoucherInput(input), context);
