import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveEmployeeDelete } from '@/features/employees/services/employees-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useEmployeeDelete() {
  const { state } = useErpContext();
  return useCommandMutation('employeeDelete', saveEmployeeDelete, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'employeeDelete', input);
    validatePolicy(state, 'employeeDelete', input);
  });
}
