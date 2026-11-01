import { postCommand } from '@/core/services/http/command-api';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveContactEntryRequest } from '@/features/accounting/types/requests/SaveContactEntryRequest';
import type { SaveContactVoucherRequest } from '@/features/accounting/types/requests/SaveContactVoucherRequest';
import type { SaveManualJournalRequest } from '@/features/accounting/types/requests/SaveManualJournalRequest';
import type { SaveMasterRequest } from '@/features/accounting/types/requests/SaveMasterRequest';
import type { SaveOperationRequest } from '@/features/accounting/types/requests/SaveOperationRequest';
import type { SavePeriodActivateRequest } from '@/features/accounting/types/requests/SavePeriodActivateRequest';
import type { SavePeriodCreateRequest } from '@/features/accounting/types/requests/SavePeriodCreateRequest';
import type { SavePeriodResetRequest } from '@/features/accounting/types/requests/SavePeriodResetRequest';
import type { SavePeriodSwitchRequest } from '@/features/accounting/types/requests/SavePeriodSwitchRequest';
import type { SavePeriodTransferRequest } from '@/features/accounting/types/requests/SavePeriodTransferRequest';
import type { SavePermissionsRequest } from '@/features/accounting/types/requests/SavePermissionsRequest';
import type { SaveScreenDraftRequest } from '@/features/accounting/types/requests/SaveScreenDraftRequest';
import type { SaveVoucherRequest } from '@/features/accounting/types/requests/SaveVoucherRequest';
export const submitPermissions = async (
  data: SavePermissionsRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'permissions', data, context);
export const submitContactEntry = async (
  data: SaveContactEntryRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'contactEntry', data, context);
export const submitContactVoucher = async (
  data: SaveContactVoucherRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'contactVoucher', data, context);
export const submitPeriodSwitch = async (
  data: SavePeriodSwitchRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'periodSwitch', data, context);
export const submitPeriodCreate = async (
  data: SavePeriodCreateRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'periodCreate', data, context);
export const submitPeriodTransfer = async (
  data: SavePeriodTransferRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'periodTransfer', data, context);
export const submitPeriodActivate = async (
  data: SavePeriodActivateRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'periodActivate', data, context);
export const submitPeriodReset = async (
  data: SavePeriodResetRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'periodReset', data, context);
export const submitScreenDraft = async (
  data: SaveScreenDraftRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'screenDraft', data, context);
export const submitMaster = async (
  data: SaveMasterRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'master', data, context);
export const submitManualJournal = async (
  data: SaveManualJournalRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'manualJournal', data, context);
export const submitOperation = async (
  data: SaveOperationRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'operation', data, context);
export const submitVoucher = async (
  data: SaveVoucherRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('accounting', 'voucher', data, context);
