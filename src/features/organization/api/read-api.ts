import { apiClient } from '@/core/api/apiClient';
import { ENDPOINTS } from '@/core/config/endpoints';
import type { GetBranchesByIdRequest } from '@/features/organization/types/requests/GetBranchesByIdRequest';
import type { GetSettingsBackupPolicyRequest } from '@/features/organization/types/requests/GetSettingsBackupPolicyRequest';
import type { GetSettingsBrandingRequest } from '@/features/organization/types/requests/GetSettingsBrandingRequest';
import type { GetSettingsCompanyRequest } from '@/features/organization/types/requests/GetSettingsCompanyRequest';
import type { GetSettingsImportTemplatesByKindRequest } from '@/features/organization/types/requests/GetSettingsImportTemplatesByKindRequest';
import type { GetSettingsServiceStatusRequest } from '@/features/organization/types/requests/GetSettingsServiceStatusRequest';
import type { GetSettingsSystemAccountingRequest } from '@/features/organization/types/requests/GetSettingsSystemAccountingRequest';
import type { GetSettingsSystemBranchesRequest } from '@/features/organization/types/requests/GetSettingsSystemBranchesRequest';
import type { GetSettingsSystemCompanyRequest } from '@/features/organization/types/requests/GetSettingsSystemCompanyRequest';
import type { GetSettingsSystemDocumentsRequest } from '@/features/organization/types/requests/GetSettingsSystemDocumentsRequest';
import type { GetSettingsSystemExpensesRequest } from '@/features/organization/types/requests/GetSettingsSystemExpensesRequest';
import type { GetSettingsSystemInventoryRequest } from '@/features/organization/types/requests/GetSettingsSystemInventoryRequest';
import type { GetSettingsSystemPurchasesRequest } from '@/features/organization/types/requests/GetSettingsSystemPurchasesRequest';
import type { GetSettingsSystemRequest } from '@/features/organization/types/requests/GetSettingsSystemRequest';
import type { GetSettingsSystemSalesRequest } from '@/features/organization/types/requests/GetSettingsSystemSalesRequest';
import type { GetUiDraftsByKeyRequest } from '@/features/organization/types/requests/GetUiDraftsByKeyRequest';
import type { SearchBranchesRequest } from '@/features/organization/types/requests/SearchBranchesRequest';
import type { SearchLookupsByResourceRequest } from '@/features/organization/types/requests/SearchLookupsByResourceRequest';
import type { BackupPolicyResponse } from '@/features/organization/types/responses/BackupPolicyResponse';
import type { BranchListResponse } from '@/features/organization/types/responses/BranchListResponse';
import type { BranchResponse } from '@/features/organization/types/responses/BranchResponse';
import type { BrandingResponse } from '@/features/organization/types/responses/BrandingResponse';
import type { DraftResponse } from '@/features/organization/types/responses/DraftResponse';
import type { ImportTemplateResponse } from '@/features/organization/types/responses/ImportTemplateResponse';
import type { LookupOptionPage } from '@/features/organization/types/responses/LookupOptionPage';
import type { OrganizationResponse } from '@/features/organization/types/responses/OrganizationResponse';
import type { ServiceStatusResponse } from '@/features/organization/types/responses/ServiceStatusResponse';
import type { SystemSettingsAccountingResponse } from '@/features/organization/types/responses/SystemSettingsAccountingResponse';
import type { SystemSettingsBranchesResponse } from '@/features/organization/types/responses/SystemSettingsBranchesResponse';
import type { SystemSettingsCompanyResponse } from '@/features/organization/types/responses/SystemSettingsCompanyResponse';
import type { SystemSettingsDocumentsResponse } from '@/features/organization/types/responses/SystemSettingsDocumentsResponse';
import type { SystemSettingsExpensesResponse } from '@/features/organization/types/responses/SystemSettingsExpensesResponse';
import type { SystemSettingsInventoryResponse } from '@/features/organization/types/responses/SystemSettingsInventoryResponse';
import type { SystemSettingsPurchasesResponse } from '@/features/organization/types/responses/SystemSettingsPurchasesResponse';
import type { SystemSettingsResponse } from '@/features/organization/types/responses/SystemSettingsResponse';
import type { SystemSettingsSalesResponse } from '@/features/organization/types/responses/SystemSettingsSalesResponse';
/** List branches. Existing HTTP contract. */
export async function fetchBranches(
  params: SearchBranchesRequest = {},
  signal?: AbortSignal,
): Promise<BranchListResponse> {
  return await apiClient.get<BranchListResponse>(ENDPOINTS.fetchBranches, {
    signal,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    },
  });
}
/** Get branches detail. Existing HTTP contract. */
export async function fetchBranchesById(params: GetBranchesByIdRequest): Promise<BranchResponse> {
  return await apiClient.get<BranchResponse>(ENDPOINTS.fetchBranchesById(params.id), {
    params: { bookId: params.bookId },
  });
}
/** Get company settings. Existing HTTP contract. */
export async function fetchSettingsCompany(
  params: GetSettingsCompanyRequest = {},
  signal?: AbortSignal,
): Promise<OrganizationResponse> {
  return await apiClient.get<OrganizationResponse>(ENDPOINTS.fetchSettingsCompany, {
    signal,
    params: { bookId: params.bookId },
  });
}
/** Get white-label branding. Existing HTTP contract. */
export async function fetchSettingsBranding(
  params: GetSettingsBrandingRequest = {},
  signal?: AbortSignal,
): Promise<BrandingResponse> {
  return await apiClient.get<BrandingResponse>(ENDPOINTS.fetchSettingsBranding, {
    signal,
    params: { bookId: params.bookId },
  });
}
/** Get all persisted system settings. Existing HTTP contract. */
export async function fetchSettingsSystem(
  params: GetSettingsSystemRequest = {},
  signal?: AbortSignal,
): Promise<SystemSettingsResponse> {
  return await apiClient.get<SystemSettingsResponse>(ENDPOINTS.fetchSettingsSystem, {
    signal,
    params: { bookId: params.bookId },
  });
}
/** Get automatic backup policy. Existing HTTP contract. */
export async function fetchSettingsBackupPolicy(
  params: GetSettingsBackupPolicyRequest = {},
  signal?: AbortSignal,
): Promise<BackupPolicyResponse> {
  return await apiClient.get<BackupPolicyResponse>(ENDPOINTS.fetchSettingsBackupPolicy, {
    signal,
    params: { bookId: params.bookId },
  });
}
/** Get accounting settings. Existing HTTP contract. */
export async function fetchSettingsSystemAccounting(
  params: GetSettingsSystemAccountingRequest = {},
): Promise<SystemSettingsAccountingResponse> {
  return await apiClient.get<SystemSettingsAccountingResponse>(
    ENDPOINTS.fetchSettingsSystemAccounting,
    { params: { bookId: params.bookId } },
  );
}
/** Get sales settings. Existing HTTP contract. */
export async function fetchSettingsSystemSales(
  params: GetSettingsSystemSalesRequest = {},
): Promise<SystemSettingsSalesResponse> {
  return await apiClient.get<SystemSettingsSalesResponse>(ENDPOINTS.fetchSettingsSystemSales, {
    params: { bookId: params.bookId },
  });
}
/** Get purchases settings. Existing HTTP contract. */
export async function fetchSettingsSystemPurchases(
  params: GetSettingsSystemPurchasesRequest = {},
): Promise<SystemSettingsPurchasesResponse> {
  return await apiClient.get<SystemSettingsPurchasesResponse>(
    ENDPOINTS.fetchSettingsSystemPurchases,
    { params: { bookId: params.bookId } },
  );
}
/** Get inventory settings. Existing HTTP contract. */
export async function fetchSettingsSystemInventory(
  params: GetSettingsSystemInventoryRequest = {},
): Promise<SystemSettingsInventoryResponse> {
  return await apiClient.get<SystemSettingsInventoryResponse>(
    ENDPOINTS.fetchSettingsSystemInventory,
    { params: { bookId: params.bookId } },
  );
}
/** Get expenses settings. Existing HTTP contract. */
export async function fetchSettingsSystemExpenses(
  params: GetSettingsSystemExpensesRequest = {},
): Promise<SystemSettingsExpensesResponse> {
  return await apiClient.get<SystemSettingsExpensesResponse>(
    ENDPOINTS.fetchSettingsSystemExpenses,
    { params: { bookId: params.bookId } },
  );
}
/** Get documents settings. Existing HTTP contract. */
export async function fetchSettingsSystemDocuments(
  params: GetSettingsSystemDocumentsRequest = {},
): Promise<SystemSettingsDocumentsResponse> {
  return await apiClient.get<SystemSettingsDocumentsResponse>(
    ENDPOINTS.fetchSettingsSystemDocuments,
    { params: { bookId: params.bookId } },
  );
}
/** Get branches settings. Existing HTTP contract. */
export async function fetchSettingsSystemBranches(
  params: GetSettingsSystemBranchesRequest = {},
): Promise<SystemSettingsBranchesResponse> {
  return await apiClient.get<SystemSettingsBranchesResponse>(
    ENDPOINTS.fetchSettingsSystemBranches,
    { params: { bookId: params.bookId } },
  );
}
/** Get company settings. Existing HTTP contract. */
export async function fetchSettingsSystemCompany(
  params: GetSettingsSystemCompanyRequest = {},
): Promise<SystemSettingsCompanyResponse> {
  return await apiClient.get<SystemSettingsCompanyResponse>(ENDPOINTS.fetchSettingsSystemCompany, {
    params: { bookId: params.bookId },
  });
}
/** Get API and database connection status. Existing HTTP contract. */
export async function fetchSettingsServiceStatus(
  _params: GetSettingsServiceStatusRequest = {},
): Promise<ServiceStatusResponse> {
  return await apiClient.get<ServiceStatusResponse>(ENDPOINTS.fetchSettingsServiceStatus, {
    params: {},
  });
}
/** Get a master-data CSV template. Existing HTTP contract. */
export async function fetchSettingsImportTemplatesByKind(
  params: GetSettingsImportTemplatesByKindRequest,
): Promise<ImportTemplateResponse> {
  return await apiClient.get<ImportTemplateResponse>(
    ENDPOINTS.fetchSettingsImportTemplatesByKind(params.kind),
    { params: {} },
  );
}
/** Get a saved screen draft. Existing HTTP contract. */
export async function fetchUiDraftsByKey(params: GetUiDraftsByKeyRequest): Promise<DraftResponse> {
  return await apiClient.get<DraftResponse>(ENDPOINTS.fetchUiDraftsByKey(params.key), {
    params: { bookId: params.bookId },
  });
}
/** Search selectable form options. Existing HTTP contract. */
export async function fetchLookupsByResource(
  params: SearchLookupsByResourceRequest,
): Promise<LookupOptionPage> {
  return await apiClient.get<LookupOptionPage>(ENDPOINTS.fetchLookupsByResource(params.resource), {
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      bookId: params.bookId,
      branchId: params.branchId,
      currency: params.currency,
    },
  });
}
