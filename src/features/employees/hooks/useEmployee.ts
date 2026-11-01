import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveEmployee } from '@/features/employees/services/employees-service';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useEmployee() {
  const { state } = useErpContext();
  return useCommandMutation('employee', saveEmployee, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'employee', input);
    validatePolicy(state, 'employee', input);
  });
}
