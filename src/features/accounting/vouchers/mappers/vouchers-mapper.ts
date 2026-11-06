import type { SaveVoucherRequest } from '@/features/ledger/public';
import { voucherSchema } from '@/features/ledger/public';
export const mapVoucherInput = (input: unknown): SaveVoucherRequest =>
  voucherSchema.parse(input) as SaveVoucherRequest;
