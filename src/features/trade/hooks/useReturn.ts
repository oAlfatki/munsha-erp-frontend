import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public/validate-period';
import { useReturnValidationData } from '@/features/trade/queries/useReturnValidationData';
import { saveReturn } from '@/features/trade/services/trade-service';
export function useReturn() {
  const loadValidationData = useReturnValidationData();
  return useCommandMutation('return', saveReturn, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'return', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
