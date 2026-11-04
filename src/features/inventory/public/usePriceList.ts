





import { useCommandMutation } from "@/core/hooks/useCommandMutation";
import { validatePeriod } from "@/features/accounting/public/validate-period";
import { usePriceListValidationData } from "@/features/inventory/queries/usePriceListValidationData";
import { savePriceList } from "@/features/inventory/services/inventory-service";
import { validateInventoryCommand } from "@/features/inventory/validation/validate-inventory-command";
export function usePriceList() {
  const loadValidationData=usePriceListValidationData();
  return useCommandMutation('priceList', savePriceList, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'priceList', input);
    /* No setting-policy branch applies to this command; its own Zod schema validates the payload. */
    validateInventoryCommand(state, 'priceList', input);
  });
}
