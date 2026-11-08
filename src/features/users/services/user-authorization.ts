import { ApiError } from '@/core/api/apiError';
import { usersApi } from '@/features/users/api/users-api';
import { roleAssignmentRequest } from '@/features/users/services/permission-assignment';
import type { PermissionAssignment } from '@/features/users/types/PermissionAssignment';
import type { UserAuthorization } from '@/features/users/types/UserAuthorization';
import { userAuthorizationSchema } from '@/features/users/validations/roles-schema';

export async function loadUserAuthorization(
  id: number,
  branchId: number,
  hasRolesSupport: boolean,
  signal?: AbortSignal,
): Promise<UserAuthorization> {

  const response = hasRolesSupport
    ? await usersApi.authorization(id, signal)
    : await usersApi.permissions(id, signal).then((value) =>
        userAuthorizationSchema.parse({
          ...value,
          assignment: { mode: 'direct', permissions: value.permissions },
        }),
      );
  if (response.userId !== id || response.branchId !== branchId)
    throw new ApiError({ detail: 'لا يمكن عرض صلاحيات خارج نطاق الفرع المسموح.' }, 403);
  return response;
}

export async function saveUserAuthorization(
  id: number,
  version: string,
  assignment: PermissionAssignment,
  hasRolesSupport: boolean,
  branchId: number,
) {

  if (hasRolesSupport) {
    const response = await usersApi.saveAuthorization(id, {
      permissionsVersion: version,
      assignment:
        assignment.mode === 'direct'
          ? assignment
          : { mode: 'role', ...roleAssignmentRequest(assignment) },
    });
    if (response.branchId !== branchId)
      throw new ApiError({ detail: 'استجابة صلاحيات المستخدم خارج نطاق الفرع المسموح.' }, 403);
    return response;
  }
  if (assignment.mode !== 'direct')
    throw Error('الخادم لم يعلن دعم الأدوار؛ لا يمكن حفظ إسناد الدور.');
  return usersApi.savePermissions(id, version, assignment.permissions);
}
