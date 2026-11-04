import type { DeleteStockDraftRequest } from '@/features/inventory/types/requests/DeleteStockDraftRequest';
import type { SavePriceListRequest } from '@/features/inventory/types/requests/SavePriceListRequest';
import type { SaveProductRequest } from '@/features/inventory/types/requests/SaveProductRequest';
import type { SaveStockDocumentRequest } from '@/features/inventory/types/requests/SaveStockDocumentRequest';
import type { SaveTransferRequest } from '@/features/inventory/types/requests/SaveTransferRequest';
import type { SaveWarehouseRequest } from '@/features/inventory/types/requests/SaveWarehouseRequest';
import {
deleteStockDraftSchema,
priceListSchema,
productSchema,
stockDocumentSchema,
transferSchema,
warehouseSchema,
} from "@/features/inventory/public/inventory-schema";
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
