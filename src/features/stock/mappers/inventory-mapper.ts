import type { DeleteStockDraftRequest } from '@/features/stock/types/requests/DeleteStockDraftRequest';
import type { SavePriceListRequest } from '@/features/stock/types/requests/SavePriceListRequest';
import type { SaveProductRequest } from '@/features/stock/types/requests/SaveProductRequest';
import type { SaveStockDocumentRequest } from '@/features/stock/types/requests/SaveStockDocumentRequest';
import type { SaveTransferRequest } from '@/features/stock/types/requests/SaveTransferRequest';
import type { SaveWarehouseRequest } from '@/features/stock/types/requests/SaveWarehouseRequest';
import {
  deleteStockDraftSchema,
  priceListSchema,
  productSchema,
  stockDocumentSchema,
  transferSchema,
  warehouseSchema,
} from '@/features/stock/validations/inventory-schema';

export const mapProductInput = (input: unknown): SaveProductRequest => productSchema.parse(input);

export const mapWarehouseInput = (input: unknown): SaveWarehouseRequest =>
  warehouseSchema.parse(input);

export const mapTransferInput = (input: unknown): SaveTransferRequest =>
  transferSchema.parse(input);

export const mapStockDocumentInput = (input: unknown): SaveStockDocumentRequest =>
  stockDocumentSchema.parse(input);

export const mapDeleteStockDraftInput = (input: unknown): DeleteStockDraftRequest =>
  deleteStockDraftSchema.parse(input);

export const mapPriceListInput = (input: unknown): SavePriceListRequest =>
  priceListSchema.parse(input);
