import type { SaveCurrencyRequest } from '@/features/ledger/types/requests/SaveCurrencyRequest';
import { currencySchema } from '@/features/ledger/validations/currency-schema';
export const mapCurrencyInput = (input: unknown): SaveCurrencyRequest =>
  currencySchema.parse(input) as SaveCurrencyRequest;
