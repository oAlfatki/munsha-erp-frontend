import { currencySchema } from '@/features/ledger/public/currency-schema';
import type { SaveCurrencyRequest } from '@/features/ledger/public/types/requests/SaveCurrencyRequest';
export const mapCurrencyInput = (input: unknown): SaveCurrencyRequest =>
  currencySchema.parse(input) as SaveCurrencyRequest;
