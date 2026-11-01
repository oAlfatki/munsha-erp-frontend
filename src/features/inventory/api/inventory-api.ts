import { postCommand } from '@/core/services/http/command-api';
import type { CommandContext } from '@/core/types/CommandContext';
import type { DeleteStockDraftRequest } from '@/features/inventory/types/requests/DeleteStockDraftRequest';
import type { SavePriceListRequest } from '@/features/inventory/types/requests/SavePriceListRequest';
import type { SaveProductRequest } from '@/features/inventory/types/requests/SaveProductRequest';
import type { SaveStockDocumentRequest } from '@/features/inventory/types/requests/SaveStockDocumentRequest';
import type { SaveTransferRequest } from '@/features/inventory/types/requests/SaveTransferRequest';
import type { SaveWarehouseRequest } from '@/features/inventory/types/requests/SaveWarehouseRequest';
export const submitProduct = async (
  data: SaveProductRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('inventory', 'product', data, context);
export const submitWarehouse = async (
  data: SaveWarehouseRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('inventory', 'warehouse', data, context);
export const submitTransfer = async (
  data: SaveTransferRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('inventory', 'transfer', data, context);
export const submitStockDocument = async (
  data: SaveStockDocumentRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('inventory', 'stockDocument', data, context);
export const submitDeleteStockDraft = async (
  data: DeleteStockDraftRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('inventory', 'deleteStockDraft', data, context);
export const submitPriceList = async (
  data: SavePriceListRequest,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof postCommand>>> =>
  postCommand('inventory', 'priceList', data, context);
