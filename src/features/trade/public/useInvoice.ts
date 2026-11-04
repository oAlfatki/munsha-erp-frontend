import { validateInvoiceSettingsPolicy } from '@/features/organization/public/invoice-policy';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public/validate-period';
import { useInvoiceValidationData } from '@/features/trade/queries/useInvoiceValidationData';
import { saveInvoice } from '@/features/trade/services/trade-service';
import { validateInvoice } from '@/features/trade/validation/validate-invoice';
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
