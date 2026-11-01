import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveImportMasters } from '@/features/settings/services/settings-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useImportMasters() {
  const { state } = useErpContext();
  return useCommandMutation('importMasters', saveImportMasters, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'importMasters', input);
    validatePolicy(state, 'importMasters', input);
  });
}
