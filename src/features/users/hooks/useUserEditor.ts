import { usersApi } from '@/features/users/api/users-api';
import type { IUserFormInput } from '@/features/users/types/IUserFormInput';
import type { UserResponse } from '@/features/users/types/responses/UserResponse';
import { userFormSchema } from '@/features/users/validation/user-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
export function useUserEditor(user: UserResponse | undefined, onSaved: () => void) {
  const cache = useQueryClient();
  const form = useForm<IUserFormInput>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      id: user?.id,
      name: user?.name || '',
      username: user?.username || '',
      password: '',
      role: user?.role || 'staff',
      active: user ? !!user.active : true,
    },
  });
  const mutation = useMutation({
    mutationFn: (values: IUserFormInput) =>
      user ? usersApi.update({ ...values, id: user.id }) : usersApi.create(values),
    onSuccess: async () => {
      await cache.invalidateQueries({ queryKey: ['erp', 'users'] });
      await cache.invalidateQueries({ queryKey: ['auth', 'account'] });
      onSaved();
    },
  });
  const submit = form.handleSubmit((values) => mutation.mutate(values));
  return { form, submit, isPending: mutation.isPending, error: mutation.error?.message || '' };
}
