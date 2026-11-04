import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public/validate-period';
import { usePartialReturnValidationData } from '@/features/trade/queries/usePartialReturnValidationData';
import { savePartialReturn } from '@/features/trade/services/trade-service';
export function usePartialReturn() {
  const loadValidationData = usePartialReturnValidationData();
  return useCommandMutation('partialReturn', savePartialReturn, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'partialReturn', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
