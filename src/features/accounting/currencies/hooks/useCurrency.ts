import { useCurrencyValidationData } from '@/features/accounting/currencies/queries/useCurrencyValidationData';
import { saveCurrency, validatePeriod } from '@/features/ledger/public';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

export function useCurrency() {

  const loadValidationData = useCurrencyValidationData();
  return useCommandMutation('currency', saveCurrency, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'currency', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
