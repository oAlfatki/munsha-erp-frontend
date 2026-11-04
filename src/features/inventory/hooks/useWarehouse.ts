





import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from "@/features/accounting/public/validate-period";
import { useWarehouseValidationData } from '@/features/inventory/queries/useWarehouseValidationData';
import { saveWarehouse } from '@/features/inventory/services/inventory-service';
import { validateInventoryCommand } from '@/features/inventory/validation/validate-inventory-command';
export function useWarehouse() {
  const loadValidationData=useWarehouseValidationData();
  return useCommandMutation('warehouse', saveWarehouse, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'warehouse', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateInventoryCommand(state, 'warehouse', input);
  });
}
