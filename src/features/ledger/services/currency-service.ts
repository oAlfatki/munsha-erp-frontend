import type { CommandContext } from '@/core/types/api/CommandContext';
import { submitCurrency } from '@/features/ledger/api/currency-api';
import { mapCurrencyInput } from '@/features/ledger/mappers/currency-mapper';
export const saveCurrency = async (
  input: unknown,
  context: CommandContext,
): Promise<Awaited<ReturnType<typeof submitCurrency>>> =>
  submitCurrency(mapCurrencyInput(input), context);
