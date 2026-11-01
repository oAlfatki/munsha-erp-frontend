import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { useErpContext } from '@/core/hooks/useErpContext';
import { validatePeriod } from '@/features/accounting/validation/validate-period';
import { saveWarehouse } from '@/features/inventory/services/inventory-service';
import { validateInventoryCommand } from '@/features/inventory/validation/validate-inventory-command';
import { validatePolicy } from '@/features/settings/validation/validate-policy';
export function useWarehouse() {
  const { state } = useErpContext();
  return useCommandMutation('warehouse', saveWarehouse, (input) => {
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'warehouse', input);
    validatePolicy(state, 'warehouse', input);
    validateInventoryCommand(state, 'warehouse', input);
  });
}
