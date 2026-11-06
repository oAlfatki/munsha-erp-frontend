import type { SaveSupplierRequest } from '@/features/suppliers/types/requests/SaveSupplierRequest';
import { supplierInputSchema } from '@/features/suppliers/validations/suppliers-schema';

export function mapSupplierInput(input: unknown): SaveSupplierRequest {
  return { ...supplierInputSchema.parse(input), kind: 'supplier' } as SaveSupplierRequest;
}
