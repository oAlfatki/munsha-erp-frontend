import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useEmployeeValidationData } from '@/features/employees/queries/useEmployeeValidationData';
import { saveEmployee } from '@/features/employees/services/employees-service';
import { validatePeriod } from '@/features/ledger/public/validate-period';
export function useEmployee() {
  const loadValidationData = useEmployeeValidationData();
  return useCommandMutation('employee', saveEmployee, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'employee', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
