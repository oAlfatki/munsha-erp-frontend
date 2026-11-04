import type { CommandContext } from '@/core/types/CommandContext';
import {
  submitDeleteStockDraft,
  submitPriceList,
  submitProduct,
  submitStockDocument,
  submitTransfer,
  submitWarehouse,
} from '@/features/stock/api/inventory-api';
import {
  mapDeleteStockDraftInput,
  mapPriceListInput,
  mapProductInput,
  mapStockDocumentInput,
  mapTransferInput,
  mapWarehouseInput,
} from '@/features/stock/mapper/inventory-mapper';
export const saveProduct = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitProduct>>> =>
  submitProduct(mapProductInput(input), context);
export const saveWarehouse = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitWarehouse>>> =>
  submitWarehouse(mapWarehouseInput(input), context);
export const saveTransfer = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitTransfer>>> =>
  submitTransfer(mapTransferInput(input), context);
export const saveStockDocument = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitStockDocument>>> =>
  submitStockDocument(mapStockDocumentInput(input), context);
export const saveDeleteStockDraft = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitDeleteStockDraft>>> =>
  submitDeleteStockDraft(mapDeleteStockDraftInput(input), context);
export const savePriceList = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitPriceList>>> =>
  submitPriceList(mapPriceListInput(input), context);
