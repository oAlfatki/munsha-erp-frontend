import type { CommandContext } from '@/core/types/api/CommandContext';
import {
  submitContactEntry,
  submitContactVoucher,
} from '@/features/accounting/contacts/api/contacts-api';
import {
  mapContactEntryInput,
  mapContactVoucherInput,
} from '@/features/accounting/contacts/mappers/contacts-mapper';
export const saveContactEntry = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitContactEntry>>> =>
  submitContactEntry(mapContactEntryInput(input), context);
export const saveContactVoucher = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitContactVoucher>>> =>
  submitContactVoucher(mapContactVoucherInput(input), context);
