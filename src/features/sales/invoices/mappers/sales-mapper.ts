import type { SaveSalesInvoiceRequest } from '@/features/sales/invoices/types/requests/SaveSalesInvoiceRequest';
import {
  salesInvoiceInputSchema,
  salesTargetSchema,
} from '@/features/sales/invoices/validations/sales-schema';
import type { SaveSalesTargetRequest } from '@/features/sales/targets/types/requests/SaveSalesTargetRequest';

export const mapSalesTargetInput = (input: unknown): SaveSalesTargetRequest =>
  salesTargetSchema.parse(input);

export function mapSalesInvoiceInput(input: unknown): SaveSalesInvoiceRequest {

  return { ...salesInvoiceInputSchema.parse(input), kind: 'sale' };
}
