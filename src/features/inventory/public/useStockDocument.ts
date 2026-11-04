import { validateStockDocumentSettingsPolicy } from "@/features/settings/public/stock-document-policy";





import { useCommandMutation } from "@/core/hooks/useCommandMutation";
import { validatePeriod } from "@/features/accounting/public/validate-period";
import { useStockDocumentValidationData } from "@/features/inventory/queries/useStockDocumentValidationData";
import { saveStockDocument } from "@/features/inventory/services/inventory-service";
import { validateInventoryCommand } from "@/features/inventory/validation/validate-inventory-command";
export function useStockDocument() {
  const loadValidationData=useStockDocumentValidationData();
  return useCommandMutation('stockDocument', saveStockDocument, async (input) => {const state=await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'stockDocument', input);
    validateStockDocumentSettingsPolicy(state,input);
    validateInventoryCommand(state, 'stockDocument', input);
  });
}
