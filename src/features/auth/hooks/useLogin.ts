import { ApiError } from '@/core/api/apiError';
import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { login } from '@/features/auth/services/auth-service';
import type { LoginCredentials } from '@/features/auth/types/LoginCredentials';
import { loginSchema } from '@/features/auth/validations/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

export function useLogin() {

  const auth = useAuth();
  const lock = useRef(false);
  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
    shouldUnregister: true,
  });
  const mutation = useMutation({
    gcTime: 0,

    mutationFn: async (input: LoginCredentials) => {

      const generation = await auth.prepareLogin();
      const response = await login(input);
      await auth.establishSession(response.user, generation);
      return response;
    },
  });

  const submit = (onSuccess: () => void) =>
    form.handleSubmit(async (values) => {
      if (lock.current) return;
      lock.current = true;
      form.clearErrors('root');
      try {
        await mutation.mutateAsync(values);
        form.reset({ username: values.username, password: '' });
        onSuccess();
      } catch (error) {
        form.setValue('password', '');
        form.setError('root', {
          message:
            error instanceof ApiError && error.status === 401
              ? 'اسم المستخدم أو كلمة المرور غير صحيحة، أو الحساب غير متاح.'
              : errorMessage(error),
        });
      } finally {
        form.setValue('password', '');
        mutation.reset();
        lock.current = false;
      }
    });

  return { form, submit, isPending: mutation.isPending || form.formState.isSubmitting };
}
