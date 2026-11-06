import type { DeleteDraftRequest } from '@/features/trade/types/requests/DeleteDraftRequest';
import type { SaveInvoiceRequest } from '@/features/trade/types/requests/SaveInvoiceRequest';
import type { SavePartialReturnRequest } from '@/features/trade/types/requests/SavePartialReturnRequest';
import type { SaveReturnRequest } from '@/features/trade/types/requests/SaveReturnRequest';
import {
  deleteDraftSchema,
  invoiceSchema,
  partialReturnSchema,
  returnSchema,
} from '@/features/trade/validations/trade-schema';

export const mapInvoiceInput = (input: unknown): SaveInvoiceRequest => invoiceSchema.parse(input);

export const mapDeleteDraftInput = (input: unknown): DeleteDraftRequest =>
  deleteDraftSchema.parse(input);

export const mapReturnInput = (input: unknown): SaveReturnRequest => returnSchema.parse(input);

export const mapPartialReturnInput = (input: unknown): SavePartialReturnRequest =>
  partialReturnSchema.parse(input);
