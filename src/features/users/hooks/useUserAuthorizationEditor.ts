import type { PermissionAssignment } from '@/features/users/types/PermissionAssignment';
import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { assertAssignmentGrantable } from '@/features/users/services/permission-assignment';
import { fetchPermissionCatalog } from '@/features/users/services/permission-catalog';
import {
  loadUserAuthorization,
  saveUserAuthorization,
} from '@/features/users/services/user-authorization';
import type { PermissionAssignmentDraft } from '@/features/users/types/PermissionAssignmentDraft';
import { permissionAssignmentSchema } from '@/features/users/validations/roles-schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export function useUserAuthorizationEditor(id: number) {

  const auth = useAuth();
  const client = useQueryClient();
  const branchId = Number(auth.user?.branchId);
  const canView = auth.can('USERS', 'USERS_PERMISSIONS_VIEW');
  const canManage = auth.can('USERS', 'USERS_PERMISSIONS_MANAGE');
  const canAssignRole = auth.canFeature('USERS', 'ROLES', 'USERS_ROLES_ASSIGN');
  const catalog = useQuery({
    queryKey: ['permissions', 'catalog', auth.user?.userId],

    queryFn: ({ signal }) => fetchPermissionCatalog(signal),

    enabled: canView,
    retry: false,
  });
  const hasRolesSupport = catalog.data?.capabilities.roles === true;
  const query = useQuery({
    queryKey: hasRolesSupport
      ? ['users', auth.user?.userId, auth.user?.branchId, 'authorization', id]
      : ['users', auth.user?.userId, 'permissions', id],

    queryFn: ({ signal }) => loadUserAuthorization(id, branchId, hasRolesSupport, signal),

    enabled: canView && !!catalog.data && Number.isSafeInteger(id) && id > 0,
    retry: false,
  });
  const [draftState, setDraftState] = useState<{
    id: number;
    branchId: number;
    hasRolesSupport: boolean;
    value: PermissionAssignmentDraft;
    version: string;
    previous: PermissionAssignment;
  } | null>(null);
  const draft =
    draftState?.id === id &&
    draftState.branchId === branchId &&
    draftState.hasRolesSupport === hasRolesSupport
      ? draftState.value
      : null;

  const setDraft = (value: PermissionAssignmentDraft) => {

    if (!query.data) return;
    const snapshot = query.data;
    setDraftState((previous) =>
      previous?.id === id &&
      previous.branchId === branchId &&
      previous.hasRolesSupport === hasRolesSupport
        ? { ...previous, value }
        : {
            id,
            branchId,
            hasRolesSupport,
            value,
            version: snapshot.permissionsVersion,
            previous: snapshot.assignment,
          },
    );
  };

  const resetDraft = async () => {

    setDraftState(null);
    await query.refetch();
  };

  const value = draft || query.data?.assignment;
  const mutation = useMutation({
    mutationFn: async () => {

      if (
        !query.data ||
        query.data.userId !== id ||
        query.data.branchId !== branchId ||
        !catalog.data ||
        !auth.can('USERS', 'USERS_PERMISSIONS_MANAGE', String(branchId))
      )
        throw Error('لا تملك صلاحية الحفظ في هذا الفرع.');
      const parsed = permissionAssignmentSchema.safeParse(draft);
      if (!parsed.success) throw Error('اختر دورًا صحيحًا وراجع الصلاحيات والاستثناءات.');
      const assignment = parsed.data;
      const previous = draftState?.previous;
      if (!previous || !draftState?.version) throw Error('أعد تحميل الصلاحيات قبل الحفظ.');
      const hasRoleChanged =
        assignment.mode !== previous.mode ||
        (assignment.mode === 'role' &&
          previous.mode === 'role' &&
          assignment.role.id !== previous.role.id);
      if (hasRoleChanged && !canAssignRole) throw Error('لا تملك صلاحية تغيير إسناد الدور.');
      if (
        assignment.mode === 'direct' &&
        !assignment.permissions.some((item) => BigInt(item.mask) > 0n)
      )
        throw Error('اختر صلاحية واحدة على الأقل.');
      assertAssignmentGrantable(
        assignment,
        auth.user?.permissions || [],
        branchId,
        catalog.data,
        previous,
      );
      return saveUserAuthorization(id, draftState.version, assignment, hasRolesSupport, branchId);
    },

    onSuccess: async () => {

      setDraftState(null);
      await client.invalidateQueries({ queryKey: ['users'] });
      if (String(id) === auth.user?.userId) {
        try {
          await auth.refreshIdentity();
        } catch (error) {
          toast.warning('حُفظت الصلاحيات، لكن تعذر تحديث الجلسة: ' + errorMessage(error));
        }
      }
    },
  });
  const hasForeignData = !!query.data && query.data.branchId !== branchId;
  return {
    auth,
    branchId,
    canView,
    canManage,
    canAssignRole,
    catalog,
    query,
    value,
    draft,
    setDraft,
    resetDraft,
    mutation,
    hasForeignData,
  };
}
