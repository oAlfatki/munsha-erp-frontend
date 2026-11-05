import type { z } from 'zod';
import type { permissionCatalogSchema } from '@/features/users/public/permission-catalog';
export interface PermissionMask {
  moduleCode: string;
  mask: string;
}
export interface UserListItem {
  id: number;
  fullName: string;
  username: string;
  branchId: number;
  branchName: string;
  isActive: boolean;
}
export interface UserDetails extends UserListItem {
  createdAtUtc: string;
  updatedAtUtc: string | null;
}
export interface UsersPage {
  items: UserListItem[];
  page: number;
  pageSize: number;
  totalCount: number;
}
export interface UsersFilters {
  page: number;
  pageSize: number;
  search: string;
  isActive?: boolean;
  branchId?: number;
}
export interface UserFormValues {
  id?: number;
  fullName: string;
  username: string;
  password: string;
  branchId: number;
  permissions: PermissionMask[];
  rowVersion?: string;
}
export interface CreateUserRequest {
  fullName: string;
  username: string;
  password: string;
  branchId: number;
  permissions: PermissionMask[];
}
export interface UpdateUserRequest {
  fullName: string;
  username: string;
  rowVersion: string;
}
export interface CreateUserResponse extends UserListItem {
  createdAtUtc: string;
  rowVersion: string;
}
export interface UserPermissions {
  userId: number;
  branchId: number;
  permissions: PermissionMask[];
  permissionsVersion: string;
}
export type PermissionCatalog = z.output<typeof permissionCatalogSchema>;
export interface AuditLogItem {
  id: number;
  eventCode: string;
  actor?: { id: number; username: string; fullName?: string };
  targetType?: string;
  targetId?: string;
  branchId?: number;
  occurredAtUtc: string;
  outcome: 'Success' | 'Failure';
}
export interface AuditFilters {
  page: number;
  pageSize: number;
  search?: string;
  actorUserId?: number;
  branchId?: number;
  eventCode?: string;
  fromUtc?: string;
  toUtc?: string;
  sortDirection?: 'asc' | 'desc';
}
export interface AuditLogsPage {
  items: AuditLogItem[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface UserSessionsPage {
  items: {
    id: string;
    deviceName?: string;
    browser?: string;
    isCurrent: boolean;
    lastActivityAtUtc?: string;
    createdAtUtc: string;
    expiresAtUtc: string;
  }[];
  page: number;
  pageSize: number;
  totalCount: number;
}
