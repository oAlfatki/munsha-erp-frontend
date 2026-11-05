import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useEmployeeDeleteValidationData } from '@/features/employees/queries/useEmployeeDeleteValidationData';
import { saveEmployeeDelete } from '@/features/employees/services/employees-service';
import { validatePeriod } from '@/features/ledger/public';
export function useEmployeeDelete() {
  const loadValidationData = useEmployeeDeleteValidationData();
  return useCommandMutation('employeeDelete', saveEmployeeDelete, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'employeeDelete', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
  });
}
