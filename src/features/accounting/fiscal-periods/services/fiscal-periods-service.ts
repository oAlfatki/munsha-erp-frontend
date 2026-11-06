import type { CommandContext } from '@/core/types/api/CommandContext';
import {
  submitPeriodActivate,
  submitPeriodCreate,
  submitPeriodReset,
  submitPeriodSwitch,
  submitPeriodTransfer,
  submitScreenDraft,
} from '@/features/accounting/fiscal-periods/api/fiscal-periods-api';
import {
  mapPeriodActivateInput,
  mapPeriodCreateInput,
  mapPeriodResetInput,
  mapPeriodSwitchInput,
  mapPeriodTransferInput,
  mapScreenDraftInput,
} from '@/features/accounting/fiscal-periods/mappers/fiscal-periods-mapper';

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
