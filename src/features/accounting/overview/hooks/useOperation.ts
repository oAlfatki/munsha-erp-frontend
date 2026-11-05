import { validateOperationSettingsPolicy } from '@/features/organization/public';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useOperationValidationData } from '@/features/accounting/overview/queries/useOperationValidationData';
import { saveOperation } from '@/features/accounting/overview/services/overview-service';
import { validatePeriod } from '@/features/ledger/public';
export function useOperation() {
  const loadValidationData = useOperationValidationData();
  return useCommandMutation('operation', saveOperation, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'operation', input);
    validateOperationSettingsPolicy(state, input);
  });
}
