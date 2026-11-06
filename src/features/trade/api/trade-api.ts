import { apiClient } from '@/core/api/apiClient';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import { ENDPOINTS } from '@/features/trade/api/endpoints';
import type { DeleteDraftRequest } from '@/features/trade/types/requests/DeleteDraftRequest';
import type { SaveInvoiceRequest } from '@/features/trade/types/requests/SaveInvoiceRequest';
import type { SavePartialReturnRequest } from '@/features/trade/types/requests/SavePartialReturnRequest';
import type { SaveReturnRequest } from '@/features/trade/types/requests/SaveReturnRequest';

export const submitInvoice = async (
  data: SaveInvoiceRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('trade', 'invoice'), {
    ...context,
    type: 'invoice',
    data: data,
  });
};

export const submitDeleteDraft = async (
  data: DeleteDraftRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('trade', 'deleteDraft'), {
    ...context,
    type: 'deleteDraft',
    data: data,
  });
};

export const submitReturn = async (
  data: SaveReturnRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('trade', 'return'), {
    ...context,
    type: 'return',
    data: data,
  });
};

export const submitPartialReturn = async (
  data: SavePartialReturnRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('trade', 'partialReturn'), {
    ...context,
    type: 'partialReturn',
    data: data,
  });
};
