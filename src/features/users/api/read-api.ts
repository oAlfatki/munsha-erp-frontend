import { ENDPOINTS } from '@/core/config/endpoints';
import { apiRequest } from '@/core/services/http/api-client';
import type { GetAuthPermissionsRequest } from '@/features/users/types/requests/GetAuthPermissionsRequest';
import type { GetUsersByIdRequest } from '@/features/users/types/requests/GetUsersByIdRequest';
import type { SearchAuditEventsRequest } from '@/features/users/types/requests/SearchAuditEventsRequest';
import type { SearchAuthSessionsRequest } from '@/features/users/types/requests/SearchAuthSessionsRequest';
import type { SearchUsersByIdSessionsRequest } from '@/features/users/types/requests/SearchUsersByIdSessionsRequest';
import type { SearchUsersRequest } from '@/features/users/types/requests/SearchUsersRequest';
import type { AuditEventListResponse } from '@/features/users/types/responses/AuditEventListResponse';
import type { PermissionResponse } from '@/features/users/types/responses/PermissionResponse';
import type { SessionListResponse } from '@/features/users/types/responses/SessionListResponse';
import type { UserListResponse } from '@/features/users/types/responses/UserListResponse';
import type { UserResponse } from '@/features/users/types/responses/UserResponse';
/** List login users. Existing HTTP contract. */
export async function fetchUsers(params: SearchUsersRequest = {}): Promise<UserListResponse> {
  return await apiRequest<UserListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchUsers,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      q: params.q,
      active: params.active,
      role: params.role,
    },
  });
}
/** Get login users detail. Existing HTTP contract. */
export async function fetchUsersById(params: GetUsersByIdRequest): Promise<UserResponse> {
  return await apiRequest<UserResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchUsersById(params.id),
    params: { bookId: params.bookId },
  });
}
/** List my active sessions. Existing HTTP contract. */
export async function fetchAuthSessions(
  params: SearchAuthSessionsRequest = {},
): Promise<SessionListResponse> {
  return await apiRequest<SessionListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchAuthSessions,
    params: { page: params.page, pageSize: params.pageSize },
  });
}
/** List a user's active sessions. Existing HTTP contract. */
export async function fetchUsersByIdSessions(
  params: SearchUsersByIdSessionsRequest,
): Promise<SessionListResponse> {
  return await apiRequest<SessionListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchUsersByIdSessions(params.id),
    params: { page: params.page, pageSize: params.pageSize },
  });
}
/** Get my effective permissions. Existing HTTP contract. */
export async function fetchAuthPermissions(
  _params: GetAuthPermissionsRequest = {},
): Promise<PermissionResponse> {
  return await apiRequest<PermissionResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchAuthPermissions,
    params: {},
  });
}
/** List user activity events. Existing HTTP contract. */
export async function fetchAuditEvents(
  params: SearchAuditEventsRequest = {},
): Promise<AuditEventListResponse> {
  return await apiRequest<AuditEventListResponse>({
    method: 'GET',
    url: ENDPOINTS.fetchAuditEvents,
    params: {
      page: params.page,
      pageSize: params.pageSize,
      bookId: params.bookId,
      from: params.from,
      to: params.to,
      q: params.q,
      action: params.action,
      reference: params.reference,
    },
  });
}
