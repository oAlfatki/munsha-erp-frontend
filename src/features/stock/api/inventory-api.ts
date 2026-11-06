import { apiClient } from '@/core/api/apiClient';
import type { CommandContext } from '@/core/types/api/CommandContext';
import type { CommandReceipt } from '@/core/types/api/CommandReceipt';
import { ENDPOINTS } from '@/features/stock/api/endpoints';
import type { DeleteStockDraftRequest } from '@/features/stock/types/requests/DeleteStockDraftRequest';
import type { SavePriceListRequest } from '@/features/stock/types/requests/SavePriceListRequest';
import type { SaveProductRequest } from '@/features/stock/types/requests/SaveProductRequest';
import type { SaveStockDocumentRequest } from '@/features/stock/types/requests/SaveStockDocumentRequest';
import type { SaveTransferRequest } from '@/features/stock/types/requests/SaveTransferRequest';
import type { SaveWarehouseRequest } from '@/features/stock/types/requests/SaveWarehouseRequest';

export const submitProduct = async (
  data: SaveProductRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('inventory', 'product'), {
    ...context,
    type: 'product',
    data: data,
  });
};

export const submitWarehouse = async (
  data: SaveWarehouseRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('inventory', 'warehouse'), {
    ...context,
    type: 'warehouse',
    data: data,
  });
};

export const submitTransfer = async (
  data: SaveTransferRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('inventory', 'transfer'), {
    ...context,
    type: 'transfer',
    data: data,
  });
};

export const submitStockDocument = async (
  data: SaveStockDocumentRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('inventory', 'stockDocument'), {
    ...context,
    type: 'stockDocument',
    data: data,
  });
};

export const submitDeleteStockDraft = async (
  data: DeleteStockDraftRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('inventory', 'deleteStockDraft'), {
    ...context,
    type: 'deleteStockDraft',
    data: data,
  });
};

export const submitPriceList = async (
  data: SavePriceListRequest,
  context: CommandContext,
): Promise<CommandReceipt> => {

  return apiClient.post<CommandReceipt>(ENDPOINTS.command('inventory', 'priceList'), {
    ...context,
    type: 'priceList',
    data: data,
  });
};
