import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public/validate-period';
import { useSalesTargetValidationData } from '@/features/sales/queries/useSalesTargetValidationData';
import { saveSalesTarget } from '@/features/sales/services/sales-service';
export function useSalesTarget() {
  const loadValidationData = useSalesTargetValidationData();
  return useCommandMutation('salesTarget', saveSalesTarget, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'salesTarget', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
