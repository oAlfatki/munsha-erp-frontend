import { validatePeriod } from '@/features/ledger/public';
import { saveSalesTarget } from '@/features/sales/invoices/services/sales-service';
import { useSalesTargetValidationData } from '@/features/sales/targets/queries/useSalesTargetValidationData';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

export function useSalesTarget() {

  const loadValidationData = useSalesTargetValidationData();
  return useCommandMutation('salesTarget', saveSalesTarget, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'salesTarget', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
