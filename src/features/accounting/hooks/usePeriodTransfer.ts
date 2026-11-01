import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { savePeriodTransfer } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function usePeriodTransfer() {
  const { state } = useErpContext();
  return useCommandMutation('periodTransfer', savePeriodTransfer, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'periodTransfer', input);
    validatePolicy(state, 'periodTransfer', input);
  });
}
