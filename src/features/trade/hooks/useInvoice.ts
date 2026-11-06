import { validateInvoiceSettingsPolicy } from '@/features/organization/public';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public';
import { useInvoiceValidationData } from '@/features/trade/queries/useInvoiceValidationData';
import { saveInvoice } from '@/features/trade/services/trade-service';
import { validateInvoice } from '@/features/trade/validations/validate-invoice';
export function useInvoice() {
  const loadValidationData = useInvoiceValidationData();
  return useCommandMutation('invoice', saveInvoice, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'invoice', input);
    validateInvoiceSettingsPolicy(state, input);
    validateInvoice(state, input);
  });
}
