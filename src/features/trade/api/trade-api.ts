import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import { requireCommandApi } from '@/core/api/require-api-mode';
import type { CommandContext } from '@/core/types/CommandContext';
import type { SaveInvoiceRequest } from '@/features/trade/public/types/requests/SaveInvoiceRequest';
import type { DeleteDraftRequest } from '@/features/trade/types/requests/DeleteDraftRequest';
import type { SavePartialReturnRequest } from '@/features/trade/types/requests/SavePartialReturnRequest';
import type { SaveReturnRequest } from '@/features/trade/types/requests/SaveReturnRequest';
export const submitInvoice = async (
  data: SaveInvoiceRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {
  requireCommandApi();
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
  requireCommandApi();
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
  requireCommandApi();
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
  requireCommandApi();
  return apiClient.post<CommandReceipt>(ENDPOINTS.command('trade', 'partialReturn'), {
    ...context,
    type: 'partialReturn',
    data: data,
  });
};
