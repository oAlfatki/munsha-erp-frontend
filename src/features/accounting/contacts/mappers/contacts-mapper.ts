import type { SaveContactEntryRequest, SaveContactVoucherRequest } from '@/features/ledger/public';
import { contactEntrySchema, contactVoucherSchema } from '@/features/ledger/public';
export const mapContactEntryInput = (input: unknown): SaveContactEntryRequest =>
  contactEntrySchema.parse(input) as SaveContactEntryRequest;
export const mapContactVoucherInput = (input: unknown): SaveContactVoucherRequest =>
  contactVoucherSchema.parse(input) as SaveContactVoucherRequest;
