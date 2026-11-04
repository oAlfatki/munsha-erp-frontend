import {
  deleteDraftSchema,
  invoiceSchema,
  partialReturnSchema,
  returnSchema,
} from '@/features/trade/public/trade-schema';
import type { SaveInvoiceRequest } from '@/features/trade/public/types/requests/SaveInvoiceRequest';
import type { DeleteDraftRequest } from '@/features/trade/types/requests/DeleteDraftRequest';
import type { SavePartialReturnRequest } from '@/features/trade/types/requests/SavePartialReturnRequest';
import type { SaveReturnRequest } from '@/features/trade/types/requests/SaveReturnRequest';
export const mapInvoiceInput = (input: unknown): SaveInvoiceRequest =>
  invoiceSchema.parse(input) as SaveInvoiceRequest;
export const mapDeleteDraftInput = (input: unknown): DeleteDraftRequest =>
  deleteDraftSchema.parse(input) as DeleteDraftRequest;
export const mapReturnInput = (input: unknown): SaveReturnRequest =>
  returnSchema.parse(input) as SaveReturnRequest;
export const mapPartialReturnInput = (input: unknown): SavePartialReturnRequest =>
  partialReturnSchema.parse(input) as SavePartialReturnRequest;
