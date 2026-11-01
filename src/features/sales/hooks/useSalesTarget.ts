import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveSalesTarget } from '@/features/sales/services/sales-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useSalesTarget() {
  const { state } = useErpContext();
  return useCommandMutation('salesTarget', saveSalesTarget, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'salesTarget', input);
    validatePolicy(state, 'salesTarget', input);
  });
}
