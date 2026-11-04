import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useCurrencyValidationData } from '@/features/accounting/queries/useCurrencyValidationData';
import { saveCurrency } from '@/features/ledger/public/currency-service';
import { validatePeriod } from '@/features/ledger/public/validate-period';
export function useCurrency() {
  const loadValidationData = useCurrencyValidationData();
  return useCommandMutation('currency', saveCurrency, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'currency', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
