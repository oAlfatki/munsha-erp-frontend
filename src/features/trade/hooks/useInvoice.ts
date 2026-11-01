import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
import { saveInvoice } from '@/features/trade/services/trade-service';
import { validateInvoice } from '@/features/trade/validation/validate-invoice';
export function useInvoice() {
  const { state } = useErpContext();
  return useCommandMutation('invoice', saveInvoice, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'invoice', input);
    validatePolicy(state, 'invoice', input);
    validateInvoice(state, input);
  });
}
