import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { usePeriodTransferValidationData } from '@/features/accounting/queries/usePeriodTransferValidationData';
import { savePeriodTransfer } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/ledger/public/validate-period';
export function usePeriodTransfer() {
  const loadValidationData = usePeriodTransferValidationData();
  return useCommandMutation('periodTransfer', savePeriodTransfer, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodTransfer', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
