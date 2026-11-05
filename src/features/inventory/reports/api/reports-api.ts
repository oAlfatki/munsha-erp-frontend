import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type {
  AdjustmentsReport,
  HistoricalCostReport,
  InventoryValuationReport,
  OpeningStockReport,
  PricesReport,
  ReorderReport,
  SearchReportsInventoryAdjustmentsRequest,
  SearchReportsInventoryHistoricalCostRequest,
  SearchReportsInventoryOpeningStockRequest,
  SearchReportsInventoryPricesRequest,
  SearchReportsInventoryReorderRequest,
  SearchReportsInventoryStagnantRequest,
  SearchReportsInventoryTransfersRequest,
  SearchReportsInventoryValuationRequest,
  StagnantReport,
  TransfersReport,
} from '@/features/stock/public';
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
