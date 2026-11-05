import type { CommandContext } from '@/core/types/CommandContext';
import {
  submitContactEntry,
  submitContactVoucher,
  submitManualJournal,
  submitOperation,
  submitPeriodActivate,
  submitPeriodCreate,
  submitPeriodReset,
  submitPeriodSwitch,
  submitPeriodTransfer,
  submitScreenDraft,
  submitVoucher,
} from '@/features/accounting/api/accounting-api';
import {
  mapContactEntryInput,
  mapContactVoucherInput,
  mapManualJournalInput,
  mapOperationInput,
  mapPeriodActivateInput,
  mapPeriodCreateInput,
  mapPeriodResetInput,
  mapPeriodSwitchInput,
  mapPeriodTransferInput,
  mapScreenDraftInput,
  mapVoucherInput,
} from '@/features/accounting/mapper/accounting-mapper';
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
export const savePeriodSwitch = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitPeriodSwitch>>> =>
  submitPeriodSwitch(mapPeriodSwitchInput(input), context);
export const savePeriodCreate = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitPeriodCreate>>> =>
  submitPeriodCreate(mapPeriodCreateInput(input), context);
export const savePeriodTransfer = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitPeriodTransfer>>> =>
  submitPeriodTransfer(mapPeriodTransferInput(input), context);
export const savePeriodActivate = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitPeriodActivate>>> =>
  submitPeriodActivate(mapPeriodActivateInput(input), context);
export const savePeriodReset = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitPeriodReset>>> =>
  submitPeriodReset(mapPeriodResetInput(input), context);
export const saveScreenDraft = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitScreenDraft>>> =>
  submitScreenDraft(mapScreenDraftInput(input), context);

export const saveManualJournal = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitManualJournal>>> =>
  submitManualJournal(mapManualJournalInput(input), context);
export const saveOperation = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitOperation>>> =>
  submitOperation(mapOperationInput(input), context);
export const saveVoucher = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitVoucher>>> =>
  submitVoucher(mapVoucherInput(input), context);
