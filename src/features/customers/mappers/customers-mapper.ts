import type { SaveCustomerRequest } from '@/features/customers/types/requests/SaveCustomerRequest';
import { customerInputSchema } from '@/features/customers/validations/customers-schema';

export function mapCustomerInput(input: unknown): SaveCustomerRequest {
  return { ...customerInputSchema.parse(input), kind: 'customer' } as SaveCustomerRequest;
}
