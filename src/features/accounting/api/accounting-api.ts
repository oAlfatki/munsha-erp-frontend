import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveContactEntryRequest } from '@/features/ledger/public/types/requests/SaveContactEntryRequest';
import type { SaveContactVoucherRequest } from '@/features/ledger/public/types/requests/SaveContactVoucherRequest';
import type { SaveManualJournalRequest } from '@/features/ledger/public/types/requests/SaveManualJournalRequest';
import type { SaveOperationRequest } from '@/features/ledger/public/types/requests/SaveOperationRequest';
import type { SavePeriodActivateRequest } from '@/features/ledger/public/types/requests/SavePeriodActivateRequest';
import type { SavePeriodCreateRequest } from '@/features/ledger/public/types/requests/SavePeriodCreateRequest';
import type { SavePeriodResetRequest } from '@/features/ledger/public/types/requests/SavePeriodResetRequest';
import type { SavePeriodSwitchRequest } from '@/features/ledger/public/types/requests/SavePeriodSwitchRequest';
import type { SavePeriodTransferRequest } from '@/features/ledger/public/types/requests/SavePeriodTransferRequest';
import type { SaveScreenDraftRequest } from '@/features/ledger/public/types/requests/SaveScreenDraftRequest';
import type { SaveVoucherRequest } from '@/features/ledger/public/types/requests/SaveVoucherRequest';
export const submitContactEntry = async (
  data: SaveContactEntryRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'contactEntry'), {
    ...context,
    type: 'contactEntry',
    data: data,
  });
};
export const submitContactVoucher = async (
  data: SaveContactVoucherRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'contactVoucher'), {
    ...context,
    type: 'contactVoucher',
    data: data,
  });
};
export const submitPeriodSwitch = async (
  data: SavePeriodSwitchRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'periodSwitch'), {
    ...context,
    type: 'periodSwitch',
    data: data,
  });
};
export const submitPeriodCreate = async (
  data: SavePeriodCreateRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'periodCreate'), {
    ...context,
    type: 'periodCreate',
    data: data,
  });
};
export const submitPeriodTransfer = async (
  data: SavePeriodTransferRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'periodTransfer'), {
    ...context,
    type: 'periodTransfer',
    data: data,
  });
};
export const submitPeriodActivate = async (
  data: SavePeriodActivateRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'periodActivate'), {
    ...context,
    type: 'periodActivate',
    data: data,
  });
};
export const submitPeriodReset = async (
  data: SavePeriodResetRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'periodReset'), {
    ...context,
    type: 'periodReset',
    data: data,
  });
};
export const submitScreenDraft = async (
  data: SaveScreenDraftRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'screenDraft'), {
    ...context,
    type: 'screenDraft',
    data: data,
  });
};

export const submitManualJournal = async (
  data: SaveManualJournalRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'manualJournal'), {
    ...context,
    type: 'manualJournal',
    data: data,
  });
};
export const submitOperation = async (
  data: SaveOperationRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'operation'), {
    ...context,
    type: 'operation',
    data: data,
  });
};
export const submitVoucher = async (
  data: SaveVoucherRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('accounting', 'voucher'), {
    ...context,
    type: 'voucher',
    data: data,
  });
};
