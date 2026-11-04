import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { SearchAccountingFinancialBooksByIdClosingStockRequest } from '@/features/ledger/public/types/requests/SearchAccountingFinancialBooksByIdClosingStockRequest';
import type { InventoryValuationReport } from '@/features/stock/public/types/responses/InventoryValuationReport';
export async function fetchAccountingFinancialBooksByIdClosingStock(
  params: SearchAccountingFinancialBooksByIdClosingStockRequest,
): Promise<InventoryValuationReport> {
  return await apiClient.get<InventoryValuationReport>(
    ENDPOINTS.fetchAccountingFinancialBooksByIdClosingStock(params.id),
    {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        branchId: params.branchId,
        asOf: params.asOf,
      },
    },
  );
}
