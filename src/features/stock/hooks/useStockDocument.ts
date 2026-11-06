import { validateStockDocumentSettingsPolicy } from '@/features/organization/public';

import { validatePeriod } from '@/features/ledger/public';
import { useStockDocumentValidationData } from '@/features/stock/queries/useStockDocumentValidationData';
import { saveStockDocument } from '@/features/stock/services/inventory-service';
import { useCommandMutation } from '@/shared/hooks/useCommandMutation';

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
