import { apiClient } from "@/core/api/apiClient";
import { ENDPOINTS } from "@/core/config/endpoints";
import type { OperationListResponse } from "@/features/employees/public/types/responses/OperationListResponse";
import type { OperationResponse } from "@/features/employees/public/types/responses/OperationResponse";
import type { GetInventoryItemGroupsByIdRequest } from "@/features/inventory/types/requests/GetInventoryItemGroupsByIdRequest";
import type { GetInventoryItemsByIdRequest } from "@/features/inventory/types/requests/GetInventoryItemsByIdRequest";
import type { GetInventoryItemsByIdUnitsRequest } from "@/features/inventory/types/requests/GetInventoryItemsByIdUnitsRequest";
import type { GetInventoryStockCountsByIdRequest } from "@/features/inventory/types/requests/GetInventoryStockCountsByIdRequest";
import type { GetInventoryStockDocumentsByIdRequest } from "@/features/inventory/types/requests/GetInventoryStockDocumentsByIdRequest";
import type { GetInventoryUnitCategoriesByIdRequest } from "@/features/inventory/types/requests/GetInventoryUnitCategoriesByIdRequest";
import type { GetInventoryUnitsByIdRequest } from "@/features/inventory/types/requests/GetInventoryUnitsByIdRequest";
import type { GetInventoryWarehousesByIdRequest } from "@/features/inventory/types/requests/GetInventoryWarehousesByIdRequest";
import type { SearchInventoryBalancesRequest } from "@/features/inventory/types/requests/SearchInventoryBalancesRequest";
import type { SearchInventoryItemGroupsRequest } from "@/features/inventory/types/requests/SearchInventoryItemGroupsRequest";
import type { SearchInventoryItemsRequest } from "@/features/inventory/types/requests/SearchInventoryItemsRequest";
import type { SearchInventoryMovementsRequest } from "@/features/inventory/types/requests/SearchInventoryMovementsRequest";
import type { SearchInventoryStockCountsRequest } from "@/features/inventory/types/requests/SearchInventoryStockCountsRequest";
import type { SearchInventoryStockDocumentsRequest } from "@/features/inventory/types/requests/SearchInventoryStockDocumentsRequest";
import type { SearchInventoryUnitCategoriesRequest } from "@/features/inventory/types/requests/SearchInventoryUnitCategoriesRequest";
import type { SearchInventoryUnitsRequest } from "@/features/inventory/types/requests/SearchInventoryUnitsRequest";
import type { SearchInventoryWarehousesRequest } from "@/features/inventory/types/requests/SearchInventoryWarehousesRequest";
import type { SearchSearchItemsRequest } from "@/features/inventory/types/requests/SearchSearchItemsRequest";
import type { InventoryMovementListResponse } from "@/features/inventory/types/responses/InventoryMovementListResponse";
import type { ItemGroupListResponse } from "@/features/inventory/types/responses/ItemGroupListResponse";
import type { ItemGroupResponse } from "@/features/inventory/types/responses/ItemGroupResponse";
import type { ItemListResponse } from "@/features/inventory/types/responses/ItemListResponse";
import type { ItemResponse } from "@/features/inventory/types/responses/ItemResponse";
import type { SearchHitListResponse } from "@/features/inventory/types/responses/SearchHitListResponse";
import type { StockBalanceListResponse } from "@/features/inventory/types/responses/StockBalanceListResponse";
import type { StockDocumentListResponse } from "@/features/inventory/types/responses/StockDocumentListResponse";
import type { StockDocumentResponse } from "@/features/inventory/types/responses/StockDocumentResponse";
import type { UnitCategoryListResponse } from "@/features/inventory/types/responses/UnitCategoryListResponse";
import type { UnitCategoryResponse } from "@/features/inventory/types/responses/UnitCategoryResponse";
import type { UnitListResponse } from "@/features/inventory/types/responses/UnitListResponse";
import type { UnitResponse } from "@/features/inventory/types/responses/UnitResponse";
import type { WarehouseListResponse } from "@/features/inventory/types/responses/WarehouseListResponse";
import type { WarehouseResponse } from "@/features/inventory/types/responses/WarehouseResponse";
/** List items. Existing HTTP contract. */
export async function fetchInventoryItems(
  params: SearchInventoryItemsRequest = {},signal?:AbortSignal
): Promise<ItemListResponse> {
  return await apiClient.get<ItemListResponse>(ENDPOINTS.fetchInventoryItems,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
      category: params.category,
    }});
}
/** Get items detail. Existing HTTP contract. */
export async function fetchInventoryItemsById(
  params: GetInventoryItemsByIdRequest,
): Promise<ItemResponse> {
  return await apiClient.get<ItemResponse>(ENDPOINTS.fetchInventoryItemsById(params.id),{params: { bookId: params.bookId }});
}
/** List warehouses. Existing HTTP contract. */
export async function fetchInventoryWarehouses(
  params: SearchInventoryWarehousesRequest = {},signal?:AbortSignal
): Promise<WarehouseListResponse> {
  return await apiClient.get<WarehouseListResponse>(ENDPOINTS.fetchInventoryWarehouses,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
      branchId: params.branchId,
    }});
}
/** Get warehouses detail. Existing HTTP contract. */
export async function fetchInventoryWarehousesById(
  params: GetInventoryWarehousesByIdRequest,
): Promise<WarehouseResponse> {
  return await apiClient.get<WarehouseResponse>(ENDPOINTS.fetchInventoryWarehousesById(params.id),{params: { bookId: params.bookId }});
}
/** List units. Existing HTTP contract. */
export async function fetchInventoryUnits(
  params: SearchInventoryUnitsRequest = {},signal?:AbortSignal
): Promise<UnitListResponse> {
  return await apiClient.get<UnitListResponse>(ENDPOINTS.fetchInventoryUnits,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    }});
}
/** Get units detail. Existing HTTP contract. */
export async function fetchInventoryUnitsById(
  params: GetInventoryUnitsByIdRequest,
): Promise<UnitResponse> {
  return await apiClient.get<UnitResponse>(ENDPOINTS.fetchInventoryUnitsById(params.id),{params: { bookId: params.bookId }});
}
/** List unit categories. Existing HTTP contract. */
export async function fetchInventoryUnitCategories(
  params: SearchInventoryUnitCategoriesRequest = {},signal?:AbortSignal
): Promise<UnitCategoryListResponse> {
  return await apiClient.get<UnitCategoryListResponse>(ENDPOINTS.fetchInventoryUnitCategories,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    }});
}
/** Get unit categories detail. Existing HTTP contract. */
export async function fetchInventoryUnitCategoriesById(
  params: GetInventoryUnitCategoriesByIdRequest,
): Promise<UnitCategoryResponse> {
  return await apiClient.get<UnitCategoryResponse>(ENDPOINTS.fetchInventoryUnitCategoriesById(params.id),{params: { bookId: params.bookId }});
}
/** List item groups. Existing HTTP contract. */
export async function fetchInventoryItemGroups(
  params: SearchInventoryItemGroupsRequest = {},signal?:AbortSignal
): Promise<ItemGroupListResponse> {
  return await apiClient.get<ItemGroupListResponse>(ENDPOINTS.fetchInventoryItemGroups,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    }});
}
/** Get item groups detail. Existing HTTP contract. */
export async function fetchInventoryItemGroupsById(
  params: GetInventoryItemGroupsByIdRequest,
): Promise<ItemGroupResponse> {
  return await apiClient.get<ItemGroupResponse>(ENDPOINTS.fetchInventoryItemGroupsById(params.id),{params: { bookId: params.bookId }});
}
/** List stock documents. Existing HTTP contract. */
export async function fetchInventoryStockDocuments(
  params: SearchInventoryStockDocumentsRequest = {},signal?:AbortSignal
): Promise<StockDocumentListResponse> {
  return await apiClient.get<StockDocumentListResponse>(ENDPOINTS.fetchInventoryStockDocuments,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      status: params.status,
      reference: params.reference,
      warehouseId: params.warehouseId,
      kind: params.kind,
      openingScope: params.openingScope,
    }});
}
/** Get a stock document. Existing HTTP contract. */
export async function fetchInventoryStockDocumentsById(
  params: GetInventoryStockDocumentsByIdRequest,
): Promise<StockDocumentResponse> {
  return await apiClient.get<StockDocumentResponse>(ENDPOINTS.fetchInventoryStockDocumentsById(params.id),{params: { bookId: params.bookId, branchId: params.branchId }});
}
/** List current stock quantities. Existing HTTP contract. */
export async function fetchInventoryBalances(
  params: SearchInventoryBalancesRequest = {},signal?:AbortSignal
): Promise<StockBalanceListResponse> {
  return await apiClient.get<StockBalanceListResponse>(ENDPOINTS.fetchInventoryBalances,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      warehouseId: params.warehouseId,
      productId: params.productId,
    }});
}
/** List item movement history. Existing HTTP contract. */
export async function fetchInventoryMovements(
  params: SearchInventoryMovementsRequest = {},signal?:AbortSignal
): Promise<InventoryMovementListResponse> {
  return await apiClient.get<InventoryMovementListResponse>(ENDPOINTS.fetchInventoryMovements,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      warehouseId: params.warehouseId,
      productId: params.productId,
      from: params.from,
      to: params.to,
      reference: params.reference,
    }});
}
/** Get item units and per-unit prices. Existing HTTP contract. */
export async function fetchInventoryItemsByIdUnits(
  params: GetInventoryItemsByIdUnitsRequest,
): Promise<ItemResponse> {
  return await apiClient.get<ItemResponse>(ENDPOINTS.fetchInventoryItemsByIdUnits(params.id),{params: { bookId: params.bookId }});
}
/** List stock counts. Existing HTTP contract. */
export async function fetchInventoryStockCounts(
  params: SearchInventoryStockCountsRequest = {},signal?:AbortSignal
): Promise<OperationListResponse> {
  return await apiClient.get<OperationListResponse>(ENDPOINTS.fetchInventoryStockCounts,{signal,params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      period: params.period,
      q: params.q,
      sourceId: params.sourceId,
    }});
}
/** Get stock counts detail. Existing HTTP contract. */
export async function fetchInventoryStockCountsById(
  params: GetInventoryStockCountsByIdRequest,
): Promise<OperationResponse> {
  return await apiClient.get<OperationResponse>(ENDPOINTS.fetchInventoryStockCountsById(params.id),{params: { bookId: params.bookId, branchId: params.branchId }});
}
/** Search item cards for the global palette. Existing HTTP contract. */
export async function fetchSearchItems(
  params: SearchSearchItemsRequest = {},
): Promise<SearchHitListResponse> {
  return await apiClient.get<SearchHitListResponse>(ENDPOINTS.fetchSearchItems,{params: { page: params.page, pageSize: params.pageSize, bookId: params.bookId, q: params.q }});
}
