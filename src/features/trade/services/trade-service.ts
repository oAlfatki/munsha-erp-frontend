import type { CommandContext } from '@/core/types/CommandContext';
import {
submitDeleteDraft,
submitInvoice,
submitPartialReturn,
submitReturn,
} from '@/features/trade/api/trade-api';
import {
mapDeleteDraftInput,
mapInvoiceInput,
mapPartialReturnInput,
mapReturnInput,
} from '@/features/trade/mapper/trade-mapper';
export const saveInvoice = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitInvoice>>> =>
  submitInvoice(mapInvoiceInput(input), context);
export const saveDeleteDraft = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitDeleteDraft>>> =>
  submitDeleteDraft(mapDeleteDraftInput(input), context);
export const saveReturn = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitReturn>>> =>
  submitReturn(mapReturnInput(input), context);
export const savePartialReturn = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitPartialReturn>>> =>
  submitPartialReturn(mapPartialReturnInput(input), context);
