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

export function useUserEditor(user: UserDetails | undefined, onSaved: () => void) {

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
    },
    shouldUnregister: false,
  });
  const mutation = useMutation({
    gcTime: 0,

    mutationFn: async (v: UserFormValues) => {

      const code = user ? 'USERS_UPDATE' : 'USERS_CREATE';
      if (!auth.can('USERS', code, String(v.branchId)))
        throw Error('لا تملك صلاحية الحفظ في هذا الفرع.');
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
