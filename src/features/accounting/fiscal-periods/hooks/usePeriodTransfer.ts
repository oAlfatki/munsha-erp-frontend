import { usePeriodTransferValidationData } from '@/features/accounting/fiscal-periods/queries/usePeriodTransferValidationData';
import { savePeriodTransfer } from '@/features/accounting/fiscal-periods/services/fiscal-periods-service';
import { validatePeriod } from '@/features/ledger/public';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

export function usePeriodTransfer() {

  const loadValidationData = usePeriodTransferValidationData();
  return useCommandMutation('periodTransfer', savePeriodTransfer, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodTransfer', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
