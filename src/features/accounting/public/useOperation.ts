import { validateOperationSettingsPolicy } from '@/features/organization/public/operation-policy';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useOperationValidationData } from '@/features/accounting/queries/useOperationValidationData';
import { saveOperation } from '@/features/accounting/services/accounting-service';
import { validatePeriod } from '@/features/ledger/public/validate-period';
export function useOperation() {
  const loadValidationData = useOperationValidationData();
  return useCommandMutation('operation', saveOperation, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'operation', input);
    validateOperationSettingsPolicy(state, input);
  });
}
