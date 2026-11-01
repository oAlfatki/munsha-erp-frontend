import { ENDPOINTS } from '@/core/config/endpoints';
import { apiRequest } from '@/core/services/http/api-client';
import type { OperationListResponse } from '@/features/employees/types/responses/OperationListResponse';
import type { OperationResponse } from '@/features/employees/types/responses/OperationResponse';
import type { GetInventoryItemGroupsByIdRequest } from '@/features/inventory/types/requests/GetInventoryItemGroupsByIdRequest';
import type { GetInventoryItemsByIdRequest } from '@/features/inventory/types/requests/GetInventoryItemsByIdRequest';
import type { GetInventoryItemsByIdUnitsRequest } from '@/features/inventory/types/requests/GetInventoryItemsByIdUnitsRequest';
import type { GetInventoryStockCountsByIdRequest } from '@/features/inventory/types/requests/GetInventoryStockCountsByIdRequest';
import type { GetInventoryStockDocumentsByIdRequest } from '@/features/inventory/types/requests/GetInventoryStockDocumentsByIdRequest';
import type { GetInventoryUnitCategoriesByIdRequest } from '@/features/inventory/types/requests/GetInventoryUnitCategoriesByIdRequest';
import type { GetInventoryUnitsByIdRequest } from '@/features/inventory/types/requests/GetInventoryUnitsByIdRequest';
import type { GetInventoryWarehousesByIdRequest } from '@/features/inventory/types/requests/GetInventoryWarehousesByIdRequest';
import type { SearchInventoryBalancesRequest } from '@/features/inventory/types/requests/SearchInventoryBalancesRequest';
import type { SearchInventoryItemGroupsRequest } from '@/features/inventory/types/requests/SearchInventoryItemGroupsRequest';
import type { SearchInventoryItemsRequest } from '@/features/inventory/types/requests/SearchInventoryItemsRequest';
import type { SearchInventoryMovementsRequest } from '@/features/inventory/types/requests/SearchInventoryMovementsRequest';
import type { SearchInventoryStockCountsRequest } from '@/features/inventory/types/requests/SearchInventoryStockCountsRequest';
import type { SearchInventoryStockDocumentsRequest } from '@/features/inventory/types/requests/SearchInventoryStockDocumentsRequest';
import type { SearchInventoryUnitCategoriesRequest } from '@/features/inventory/types/requests/SearchInventoryUnitCategoriesRequest';
import type { SearchInventoryUnitsRequest } from '@/features/inventory/types/requests/SearchInventoryUnitsRequest';
import type { SearchInventoryWarehousesRequest } from '@/features/inventory/types/requests/SearchInventoryWarehousesRequest';
import type { SearchSearchItemsRequest } from '@/features/inventory/types/requests/SearchSearchItemsRequest';
import type { InventoryMovementListResponse } from '@/features/inventory/types/responses/InventoryMovementListResponse';
import type { ItemGroupListResponse } from '@/features/inventory/types/responses/ItemGroupListResponse';
import type { ItemGroupResponse } from '@/features/inventory/types/responses/ItemGroupResponse';
import type { ItemListResponse } from '@/features/inventory/types/responses/ItemListResponse';
import type { ItemResponse } from '@/features/inventory/types/responses/ItemResponse';
import type { SearchHitListResponse } from '@/features/inventory/types/responses/SearchHitListResponse';
import type { StockBalanceListResponse } from '@/features/inventory/types/responses/StockBalanceListResponse';
import type { StockDocumentListResponse } from '@/features/inventory/types/responses/StockDocumentListResponse';
import type { StockDocumentResponse } from '@/features/inventory/types/responses/StockDocumentResponse';
import type { UnitCategoryListResponse } from '@/features/inventory/types/responses/UnitCategoryListResponse';
import type { UnitCategoryResponse } from '@/features/inventory/types/responses/UnitCategoryResponse';
import type { UnitListResponse } from '@/features/inventory/types/responses/UnitListResponse';
import type { UnitResponse } from '@/features/inventory/types/responses/UnitResponse';
import type { WarehouseListResponse } from '@/features/inventory/types/responses/WarehouseListResponse';
import type { WarehouseResponse } from '@/features/inventory/types/responses/WarehouseResponse';
/** List items. Existing HTTP contract. */
export async function fetchInventoryItems(
  params: SearchInventoryItemsRequest = {},
): Promise<ItemListResponse> {
  return await apiRequest<ItemListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryItems,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
      category: params.category,
    },
  });
}
/** Get items detail. Existing HTTP contract. */
export async function fetchInventoryItemsById(
  params: GetInventoryItemsByIdRequest,
): Promise<ItemResponse> {
  return await apiRequest<ItemResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryItemsById(params.id),
    params: { bookId: params.bookId },
  });
}
/** List warehouses. Existing HTTP contract. */
export async function fetchInventoryWarehouses(
  params: SearchInventoryWarehousesRequest = {},
): Promise<WarehouseListResponse> {
  return await apiRequest<WarehouseListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryWarehouses,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
      branchId: params.branchId,
    },
  });
}
/** Get warehouses detail. Existing HTTP contract. */
export async function fetchInventoryWarehousesById(
  params: GetInventoryWarehousesByIdRequest,
): Promise<WarehouseResponse> {
  return await apiRequest<WarehouseResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryWarehousesById(params.id),
    params: { bookId: params.bookId },
  });
}
/** List units. Existing HTTP contract. */
export async function fetchInventoryUnits(
  params: SearchInventoryUnitsRequest = {},
): Promise<UnitListResponse> {
  return await apiRequest<UnitListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryUnits,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    },
  });
}
/** Get units detail. Existing HTTP contract. */
export async function fetchInventoryUnitsById(
  params: GetInventoryUnitsByIdRequest,
): Promise<UnitResponse> {
  return await apiRequest<UnitResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryUnitsById(params.id),
    params: { bookId: params.bookId },
  });
}
/** List unit categories. Existing HTTP contract. */
export async function fetchInventoryUnitCategories(
  params: SearchInventoryUnitCategoriesRequest = {},
): Promise<UnitCategoryListResponse> {
  return await apiRequest<UnitCategoryListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryUnitCategories,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    },
  });
}
/** Get unit categories detail. Existing HTTP contract. */
export async function fetchInventoryUnitCategoriesById(
  params: GetInventoryUnitCategoriesByIdRequest,
): Promise<UnitCategoryResponse> {
  return await apiRequest<UnitCategoryResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryUnitCategoriesById(params.id),
    params: { bookId: params.bookId },
  });
}
/** List item groups. Existing HTTP contract. */
export async function fetchInventoryItemGroups(
  params: SearchInventoryItemGroupsRequest = {},
): Promise<ItemGroupListResponse> {
  return await apiRequest<ItemGroupListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryItemGroups,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    },
  });
}
/** Get item groups detail. Existing HTTP contract. */
export async function fetchInventoryItemGroupsById(
  params: GetInventoryItemGroupsByIdRequest,
): Promise<ItemGroupResponse> {
  return await apiRequest<ItemGroupResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryItemGroupsById(params.id),
    params: { bookId: params.bookId },
  });
}
/** List stock documents. Existing HTTP contract. */
export async function fetchInventoryStockDocuments(
  params: SearchInventoryStockDocumentsRequest = {},
): Promise<StockDocumentListResponse> {
  return await apiRequest<StockDocumentListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryStockDocuments,
    params: {
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
    },
  });
}
/** Get a stock document. Existing HTTP contract. */
export async function fetchInventoryStockDocumentsById(
  params: GetInventoryStockDocumentsByIdRequest,
): Promise<StockDocumentResponse> {
  return await apiRequest<StockDocumentResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryStockDocumentsById(params.id),
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
/** List current stock quantities. Existing HTTP contract. */
export async function fetchInventoryBalances(
  params: SearchInventoryBalancesRequest = {},
): Promise<StockBalanceListResponse> {
  return await apiRequest<StockBalanceListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryBalances,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      warehouseId: params.warehouseId,
      productId: params.productId,
    },
  });
}
/** List item movement history. Existing HTTP contract. */
export async function fetchInventoryMovements(
  params: SearchInventoryMovementsRequest = {},
): Promise<InventoryMovementListResponse> {
  return await apiRequest<InventoryMovementListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryMovements,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      warehouseId: params.warehouseId,
      productId: params.productId,
      from: params.from,
      to: params.to,
      reference: params.reference,
    },
  });
}
/** Get item units and per-unit prices. Existing HTTP contract. */
export async function fetchInventoryItemsByIdUnits(
  params: GetInventoryItemsByIdUnitsRequest,
): Promise<ItemResponse> {
  return await apiRequest<ItemResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryItemsByIdUnits(params.id),
    params: { bookId: params.bookId },
  });
}
/** List stock counts. Existing HTTP contract. */
export async function fetchInventoryStockCounts(
  params: SearchInventoryStockCountsRequest = {},
): Promise<OperationListResponse> {
  return await apiRequest<OperationListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryStockCounts,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      branchId: params.branchId,
      from: params.from,
      to: params.to,
      period: params.period,
      q: params.q,
      sourceId: params.sourceId,
    },
  });
}
/** Get stock counts detail. Existing HTTP contract. */
export async function fetchInventoryStockCountsById(
  params: GetInventoryStockCountsByIdRequest,
): Promise<OperationResponse> {
  return await apiRequest<OperationResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchInventoryStockCountsById(params.id),
    params: { bookId: params.bookId, branchId: params.branchId },
  });
}
/** Search item cards for the global palette. Existing HTTP contract. */
export async function fetchSearchItems(
  params: SearchSearchItemsRequest = {},
): Promise<SearchHitListResponse> {
  return await apiRequest<SearchHitListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchSearchItems,
    params: { page: params.page, pageSize: params.pageSize, bookId: params.bookId, q: params.q },
  });
}
