import type { PermissionCatalog } from '@/features/users/types/PermissionCatalog';
import {
  assertAssignmentGrantable,
  roleAssignmentRequest,
} from '@/features/users/services/permission-assignment';
import { permissionAssignmentSchema } from '@/features/users/validations/roles-schema';
import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { usersApi } from '@/features/users/api/users-api';
import type { UserDetails } from '@/features/users/types/UserDetails';
import type { UserFormValues } from '@/features/users/types/UserFormValues';
import { assertGrantable } from '@/features/users/validations/permission-grants';
import { userFormSchema } from '@/features/users/validations/user-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

export function useUserEditor(
  user: UserDetails | undefined,
  onSaved: () => void,
  catalog?: PermissionCatalog,
) {

  const auth = useAuth(),
    client = useQueryClient(),
    lock = useRef(false);
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      id: user?.id,
      fullName: user?.fullName || '',
      username: user?.username || '',
      password: '',
      branchId: user?.branchId || Number(auth.user?.branchId),
      permissions: [],
      assignmentMode: 'direct',
      additionalPermissions: [],
      excludedPermissions: [],
    },
    shouldUnregister: false,
  });
  const mutation = useMutation({
    gcTime: 0,

    mutationFn: async (v: UserFormValues) => {

      const code = user ? 'USERS_UPDATE' : 'USERS_CREATE';
      if (!auth.can('USERS', code, String(v.branchId)))
        throw Error('لا تملك صلاحية الحفظ في هذا الفرع.');
      if (!user && v.assignmentMode === 'role') {
        if (!catalog?.capabilities.roles) throw Error('الخادم لم يعلن دعم الأدوار.');
        if (!auth.canFeature('USERS', 'ROLES', 'USERS_ROLES_ASSIGN', String(v.branchId)))
          throw Error('لا تملك صلاحية إسناد الأدوار.');
        const assignment = permissionAssignmentSchema.parse({
          mode: 'role',
          role: v.role,
          additionalPermissions: v.additionalPermissions || [],
          excludedPermissions: v.excludedPermissions || [],
        });
        if (assignment.mode !== 'role') throw Error('اختر دورًا صحيحًا.');
        assertAssignmentGrantable(assignment, auth.user?.permissions || [], v.branchId, catalog);
        return usersApi.createWithRole({
          fullName: v.fullName,
          username: v.username,
          password: v.password,
          branchId: v.branchId,
          ...roleAssignmentRequest(assignment),
        });
      }
      if (!user) assertGrantable(v.permissions, auth.user?.permissions || []);
      return user
        ? usersApi.update(user.id, {
            fullName: v.fullName,
            username: v.username,
            rowVersion: v.rowVersion!,
          })
        : usersApi.create({
            fullName: v.fullName,
            username: v.username,
            password: v.password,
            branchId: v.branchId,
            permissions: v.permissions,
          });
    },

    onSuccess: async () => {

      form.setValue('password', '');
      await client.invalidateQueries({ queryKey: ['users'] });
      onSaved();
    },
  });
  const submit = form.handleSubmit(async (v) => {
    if (lock.current) return;
    lock.current = true;
    try {
      await mutation.mutateAsync(v);
    } catch (e) {
      form.setError('root', { message: errorMessage(e) });
    } finally {
      lock.current = false;
      form.setValue('password', '');
      mutation.reset();
    }
  });
  return {
    form,
    submit,
    isPending: mutation.isPending,
    isEditing: !!user,
    error: form.formState.errors.root?.message || '',
    hasVersion: !user || !!form.getValues('rowVersion'),
  };
}
