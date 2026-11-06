import type { SaveOperationRequest } from '@/features/ledger/public';
import { operationSchema } from '@/features/ledger/public';
export const mapOperationInput = (input: unknown): SaveOperationRequest =>
  operationSchema.parse(input) as SaveOperationRequest;
