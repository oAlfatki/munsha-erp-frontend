import {
  deleteStockDraftSchema,
  priceListSchema,
  productSchema,
  stockDocumentSchema,
  transferSchema,
  warehouseSchema,
} from '@/features/stock/public/inventory-schema';
import type { DeleteStockDraftRequest } from '@/features/stock/types/requests/DeleteStockDraftRequest';
import type { SavePriceListRequest } from '@/features/stock/types/requests/SavePriceListRequest';
import type { SaveProductRequest } from '@/features/stock/types/requests/SaveProductRequest';
import type { SaveStockDocumentRequest } from '@/features/stock/types/requests/SaveStockDocumentRequest';
import type { SaveTransferRequest } from '@/features/stock/types/requests/SaveTransferRequest';
import type { SaveWarehouseRequest } from '@/features/stock/types/requests/SaveWarehouseRequest';
export const mapProductInput = (input: unknown): SaveProductRequest =>
  productSchema.parse(input) as SaveProductRequest;
export const mapWarehouseInput = (input: unknown): SaveWarehouseRequest =>
  warehouseSchema.parse(input) as SaveWarehouseRequest;
export const mapTransferInput = (input: unknown): SaveTransferRequest =>
  transferSchema.parse(input) as SaveTransferRequest;
export const mapStockDocumentInput = (input: unknown): SaveStockDocumentRequest =>
  stockDocumentSchema.parse(input) as SaveStockDocumentRequest;
export const mapDeleteStockDraftInput = (input: unknown): DeleteStockDraftRequest =>
  deleteStockDraftSchema.parse(input) as DeleteStockDraftRequest;
export const mapPriceListInput = (input: unknown): SavePriceListRequest =>
  priceListSchema.parse(input) as SavePriceListRequest;
