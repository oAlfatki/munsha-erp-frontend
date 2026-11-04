import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { SearchReportsInventoryAdjustmentsRequest } from '@/features/stock/public/types/requests/SearchReportsInventoryAdjustmentsRequest';
import type { SearchReportsInventoryHistoricalCostRequest } from '@/features/stock/public/types/requests/SearchReportsInventoryHistoricalCostRequest';
import type { SearchReportsInventoryOpeningStockRequest } from '@/features/stock/public/types/requests/SearchReportsInventoryOpeningStockRequest';
import type { SearchReportsInventoryPricesRequest } from '@/features/stock/public/types/requests/SearchReportsInventoryPricesRequest';
import type { SearchReportsInventoryReorderRequest } from '@/features/stock/public/types/requests/SearchReportsInventoryReorderRequest';
import type { SearchReportsInventoryStagnantRequest } from '@/features/stock/public/types/requests/SearchReportsInventoryStagnantRequest';
import type { SearchReportsInventoryTransfersRequest } from '@/features/stock/public/types/requests/SearchReportsInventoryTransfersRequest';
import type { SearchReportsInventoryValuationRequest } from '@/features/stock/public/types/requests/SearchReportsInventoryValuationRequest';
import type { AdjustmentsReport } from '@/features/stock/public/types/responses/AdjustmentsReport';
import type { HistoricalCostReport } from '@/features/stock/public/types/responses/HistoricalCostReport';
import type { InventoryValuationReport } from '@/features/stock/public/types/responses/InventoryValuationReport';
import type { OpeningStockReport } from '@/features/stock/public/types/responses/OpeningStockReport';
import type { PricesReport } from '@/features/stock/public/types/responses/PricesReport';
import type { ReorderReport } from '@/features/stock/public/types/responses/ReorderReport';
import type { StagnantReport } from '@/features/stock/public/types/responses/StagnantReport';
import type { TransfersReport } from '@/features/stock/public/types/responses/TransfersReport';
export async function fetchReportsInventoryValuation(
  params: SearchReportsInventoryValuationRequest,
): Promise<InventoryValuationReport> {
  return await apiClient.get<InventoryValuationReport>(ENDPOINTS.fetchReportsInventoryValuation, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      warehouseId: params.warehouseId,
      productId: params.productId,
    },
  });
}
export async function fetchReportsInventoryOpeningStock(
  params: SearchReportsInventoryOpeningStockRequest,
): Promise<OpeningStockReport> {
  return await apiClient.get<OpeningStockReport>(ENDPOINTS.fetchReportsInventoryOpeningStock, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      warehouseId: params.warehouseId,
      productId: params.productId,
    },
  });
}
export async function fetchReportsInventoryReorder(
  params: SearchReportsInventoryReorderRequest,
): Promise<ReorderReport> {
  return await apiClient.get<ReorderReport>(ENDPOINTS.fetchReportsInventoryReorder, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      q: params.q,
      asOf: params.asOf,
      warehouseId: params.warehouseId,
      productId: params.productId,
    },
  });
}
export async function fetchReportsInventoryStagnant(
  params: SearchReportsInventoryStagnantRequest,
): Promise<StagnantReport> {
  return await apiClient.get<StagnantReport>(ENDPOINTS.fetchReportsInventoryStagnant, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      warehouseId: params.warehouseId,
      productId: params.productId,
    },
  });
}
export async function fetchReportsInventoryHistoricalCost(
  params: SearchReportsInventoryHistoricalCostRequest,
): Promise<HistoricalCostReport> {
  return await apiClient.get<HistoricalCostReport>(ENDPOINTS.fetchReportsInventoryHistoricalCost, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      warehouseId: params.warehouseId,
      productId: params.productId,
    },
  });
}
export async function fetchReportsInventoryTransfers(
  params: SearchReportsInventoryTransfersRequest,
): Promise<TransfersReport> {
  return await apiClient.get<TransfersReport>(ENDPOINTS.fetchReportsInventoryTransfers, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      warehouseId: params.warehouseId,
      productId: params.productId,
    },
  });
}
export async function fetchReportsInventoryAdjustments(
  params: SearchReportsInventoryAdjustmentsRequest,
): Promise<AdjustmentsReport> {
  return await apiClient.get<AdjustmentsReport>(ENDPOINTS.fetchReportsInventoryAdjustments, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      warehouseId: params.warehouseId,
      productId: params.productId,
    },
  });
}
export async function fetchReportsInventoryPrices(
  params: SearchReportsInventoryPricesRequest,
): Promise<PricesReport> {
  return await apiClient.get<PricesReport>(ENDPOINTS.fetchReportsInventoryPrices, {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      q: params.q,
      productId: params.productId,
      category: params.category,
      priceType: params.priceType,
    },
  });
}
