import { apiClient } from '@/core/api/apiClient';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import { ENDPOINTS } from '@/features/accounting/api/endpoints';
import type {
  SavePeriodActivateRequest,
  SavePeriodCreateRequest,
  SavePeriodResetRequest,
  SavePeriodSwitchRequest,
  SavePeriodTransferRequest,
  SaveScreenDraftRequest,
} from '@/features/ledger/public';

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
