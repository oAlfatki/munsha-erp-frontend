import { ENDPOINTS } from '@/core/config/endpoints';
import { apiClient } from '@/core/api/apiClient';
import type { GetBranchesByIdRequest } from '@/features/settings/types/requests/GetBranchesByIdRequest';
import type { GetSettingsBackupPolicyRequest } from '@/features/settings/types/requests/GetSettingsBackupPolicyRequest';
import type { GetSettingsBrandingRequest } from '@/features/settings/types/requests/GetSettingsBrandingRequest';
import type { GetSettingsCompanyRequest } from '@/features/settings/types/requests/GetSettingsCompanyRequest';
import type { GetSettingsImportTemplatesByKindRequest } from '@/features/settings/types/requests/GetSettingsImportTemplatesByKindRequest';
import type { GetSettingsServiceStatusRequest } from '@/features/settings/types/requests/GetSettingsServiceStatusRequest';
import type { GetSettingsSystemAccountingRequest } from '@/features/settings/types/requests/GetSettingsSystemAccountingRequest';
import type { GetSettingsSystemBranchesRequest } from '@/features/settings/types/requests/GetSettingsSystemBranchesRequest';
import type { GetSettingsSystemCompanyRequest } from '@/features/settings/types/requests/GetSettingsSystemCompanyRequest';
import type { GetSettingsSystemDocumentsRequest } from '@/features/settings/types/requests/GetSettingsSystemDocumentsRequest';
import type { GetSettingsSystemExpensesRequest } from '@/features/settings/types/requests/GetSettingsSystemExpensesRequest';
import type { GetSettingsSystemInventoryRequest } from '@/features/settings/types/requests/GetSettingsSystemInventoryRequest';
import type { GetSettingsSystemPurchasesRequest } from '@/features/settings/types/requests/GetSettingsSystemPurchasesRequest';
import type { GetSettingsSystemRequest } from '@/features/settings/types/requests/GetSettingsSystemRequest';
import type { GetSettingsSystemSalesRequest } from '@/features/settings/types/requests/GetSettingsSystemSalesRequest';
import type { GetUiDraftsByKeyRequest } from '@/features/settings/types/requests/GetUiDraftsByKeyRequest';
import type { SearchBranchesRequest } from '@/features/settings/types/requests/SearchBranchesRequest';
import type { SearchLookupsByResourceRequest } from '@/features/settings/types/requests/SearchLookupsByResourceRequest';
import type { BackupPolicyResponse } from '@/features/settings/types/responses/BackupPolicyResponse';
import type { BranchListResponse } from '@/features/settings/types/responses/BranchListResponse';
import type { BranchResponse } from '@/features/settings/types/responses/BranchResponse';
import type { BrandingResponse } from '@/features/settings/types/responses/BrandingResponse';
import type { DraftResponse } from '@/features/settings/types/responses/DraftResponse';
import type { ImportTemplateResponse } from '@/features/settings/types/responses/ImportTemplateResponse';
import type { LookupOptionPage } from '@/features/settings/types/responses/LookupOptionPage';
import type { OrganizationResponse } from '@/features/settings/types/responses/OrganizationResponse';
import type { ServiceStatusResponse } from '@/features/settings/types/responses/ServiceStatusResponse';
import type { SystemSettingsAccountingResponse } from '@/features/settings/types/responses/SystemSettingsAccountingResponse';
import type { SystemSettingsBranchesResponse } from '@/features/settings/types/responses/SystemSettingsBranchesResponse';
import type { SystemSettingsCompanyResponse } from '@/features/settings/types/responses/SystemSettingsCompanyResponse';
import type { SystemSettingsDocumentsResponse } from '@/features/settings/types/responses/SystemSettingsDocumentsResponse';
import type { SystemSettingsExpensesResponse } from '@/features/settings/types/responses/SystemSettingsExpensesResponse';
import type { SystemSettingsInventoryResponse } from '@/features/settings/types/responses/SystemSettingsInventoryResponse';
import type { SystemSettingsPurchasesResponse } from '@/features/settings/types/responses/SystemSettingsPurchasesResponse';
import type { SystemSettingsResponse } from '@/features/settings/types/responses/SystemSettingsResponse';
import type { SystemSettingsSalesResponse } from '@/features/settings/types/responses/SystemSettingsSalesResponse';
/** List branches. Existing HTTP contract. */
export async function fetchBranches(
  params: SearchBranchesRequest = {},
): Promise<BranchListResponse> {
  return await apiClient.get<BranchListResponse>(ENDPOINTS.fetchBranches,{params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      bookId: params.bookId,
    }});
}
/** Get branches detail. Existing HTTP contract. */
export async function fetchBranchesById(params: GetBranchesByIdRequest): Promise<BranchResponse> {
  return await apiClient.get<BranchResponse>(ENDPOINTS.fetchBranchesById(params.id),{params: { bookId: params.bookId }});
}
/** Get company settings. Existing HTTP contract. */
export async function fetchSettingsCompany(
  params: GetSettingsCompanyRequest = {},
): Promise<OrganizationResponse> {
  return await apiClient.get<OrganizationResponse>(ENDPOINTS.fetchSettingsCompany,{params: { bookId: params.bookId }});
}
/** Get white-label branding. Existing HTTP contract. */
export async function fetchSettingsBranding(
  params: GetSettingsBrandingRequest = {},
): Promise<BrandingResponse> {
  return await apiClient.get<BrandingResponse>(ENDPOINTS.fetchSettingsBranding,{params: { bookId: params.bookId }});
}
/** Get all persisted system settings. Existing HTTP contract. */
export async function fetchSettingsSystem(
  params: GetSettingsSystemRequest = {},
): Promise<SystemSettingsResponse> {
  return await apiClient.get<SystemSettingsResponse>(ENDPOINTS.fetchSettingsSystem,{params: { bookId: params.bookId }});
}
/** Get automatic backup policy. Existing HTTP contract. */
export async function fetchSettingsBackupPolicy(
  params: GetSettingsBackupPolicyRequest = {},
): Promise<BackupPolicyResponse> {
  return await apiClient.get<BackupPolicyResponse>(ENDPOINTS.fetchSettingsBackupPolicy,{params: { bookId: params.bookId }});
}
/** Get accounting settings. Existing HTTP contract. */
export async function fetchSettingsSystemAccounting(
  params: GetSettingsSystemAccountingRequest = {},
): Promise<SystemSettingsAccountingResponse> {
  return await apiClient.get<SystemSettingsAccountingResponse>(ENDPOINTS.fetchSettingsSystemAccounting,{params: { bookId: params.bookId }});
}
/** Get sales settings. Existing HTTP contract. */
export async function fetchSettingsSystemSales(
  params: GetSettingsSystemSalesRequest = {},
): Promise<SystemSettingsSalesResponse> {
  return await apiClient.get<SystemSettingsSalesResponse>(ENDPOINTS.fetchSettingsSystemSales,{params: { bookId: params.bookId }});
}
/** Get purchases settings. Existing HTTP contract. */
export async function fetchSettingsSystemPurchases(
  params: GetSettingsSystemPurchasesRequest = {},
): Promise<SystemSettingsPurchasesResponse> {
  return await apiClient.get<SystemSettingsPurchasesResponse>(ENDPOINTS.fetchSettingsSystemPurchases,{params: { bookId: params.bookId }});
}
/** Get inventory settings. Existing HTTP contract. */
export async function fetchSettingsSystemInventory(
  params: GetSettingsSystemInventoryRequest = {},
): Promise<SystemSettingsInventoryResponse> {
  return await apiClient.get<SystemSettingsInventoryResponse>(ENDPOINTS.fetchSettingsSystemInventory,{params: { bookId: params.bookId }});
}
/** Get expenses settings. Existing HTTP contract. */
export async function fetchSettingsSystemExpenses(
  params: GetSettingsSystemExpensesRequest = {},
): Promise<SystemSettingsExpensesResponse> {
  return await apiClient.get<SystemSettingsExpensesResponse>(ENDPOINTS.fetchSettingsSystemExpenses,{params: { bookId: params.bookId }});
}
/** Get documents settings. Existing HTTP contract. */
export async function fetchSettingsSystemDocuments(
  params: GetSettingsSystemDocumentsRequest = {},
): Promise<SystemSettingsDocumentsResponse> {
  return await apiClient.get<SystemSettingsDocumentsResponse>(ENDPOINTS.fetchSettingsSystemDocuments,{params: { bookId: params.bookId }});
}
/** Get branches settings. Existing HTTP contract. */
export async function fetchSettingsSystemBranches(
  params: GetSettingsSystemBranchesRequest = {},
): Promise<SystemSettingsBranchesResponse> {
  return await apiClient.get<SystemSettingsBranchesResponse>(ENDPOINTS.fetchSettingsSystemBranches,{params: { bookId: params.bookId }});
}
/** Get company settings. Existing HTTP contract. */
export async function fetchSettingsSystemCompany(
  params: GetSettingsSystemCompanyRequest = {},
): Promise<SystemSettingsCompanyResponse> {
  return await apiClient.get<SystemSettingsCompanyResponse>(ENDPOINTS.fetchSettingsSystemCompany,{params: { bookId: params.bookId }});
}
/** Get API and database connection status. Existing HTTP contract. */
export async function fetchSettingsServiceStatus(
  _params: GetSettingsServiceStatusRequest = {},
): Promise<ServiceStatusResponse> {
  return await apiClient.get<ServiceStatusResponse>(ENDPOINTS.fetchSettingsServiceStatus,{params: {}});
}
/** Get a master-data CSV template. Existing HTTP contract. */
export async function fetchSettingsImportTemplatesByKind(
  params: GetSettingsImportTemplatesByKindRequest,
): Promise<ImportTemplateResponse> {
  return await apiClient.get<ImportTemplateResponse>(ENDPOINTS.fetchSettingsImportTemplatesByKind(params.kind),{params: {}});
}
/** Get a saved screen draft. Existing HTTP contract. */
export async function fetchUiDraftsByKey(params: GetUiDraftsByKeyRequest): Promise<DraftResponse> {
  return await apiClient.get<DraftResponse>(ENDPOINTS.fetchUiDraftsByKey(params.key),{params: { bookId: params.bookId }});
}
/** Search selectable form options. Existing HTTP contract. */
export async function fetchLookupsByResource(
  params: SearchLookupsByResourceRequest,
): Promise<LookupOptionPage> {
  return await apiClient.get<LookupOptionPage>(ENDPOINTS.fetchLookupsByResource(params.resource),{params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      bookId: params.bookId,
      branchId: params.branchId,
      currency: params.currency,
    }});
}
