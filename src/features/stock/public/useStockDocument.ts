import { validateStockDocumentSettingsPolicy } from '@/features/organization/public/stock-document-policy';

import { useCommandMutation } from '@/core/hooks/useCommandMutation';
import { validatePeriod } from '@/features/ledger/public/validate-period';
import { saveStockDocument } from '@/features/stock/public/inventory-service';
import { useStockDocumentValidationData } from '@/features/stock/queries/useStockDocumentValidationData';
export function useStockDocument() {
  const loadValidationData = useStockDocumentValidationData();
  return useCommandMutation('stockDocument', saveStockDocument, async (input) => {
    const state = await loadValidationData();
    if (!state) throw Error('انتظر تحميل بيانات العملية');
    validatePeriod(state, 'stockDocument', input);
    validateStockDocumentSettingsPolicy(state, input);
    // The original generic validator has no stockDocument branch; feature schema and UI checks remain authoritative for preliminary validation.
  });
}
