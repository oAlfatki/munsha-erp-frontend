import type { SaveSalesInvoiceRequest } from '@/features/sales/types/requests/SaveSalesInvoiceRequest';
import type { SaveSalesTargetRequest } from '@/features/sales/types/requests/SaveSalesTargetRequest';
import {
salesInvoiceInputSchema,
salesTargetSchema,
} from '@/features/sales/validation/sales-schema';
export const mapSalesTargetInput = (input: unknown): SaveSalesTargetRequest =>
  salesTargetSchema.parse(input) as SaveSalesTargetRequest;

export function mapSalesInvoiceInput(input: unknown): SaveSalesInvoiceRequest {
  return { ...salesInvoiceInputSchema.parse(input), kind: 'sale' } as SaveSalesInvoiceRequest;
}
