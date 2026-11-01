import { login } from '@/features/auth/services/auth-service';
import type { ILoginInput } from '@/features/auth/types/ILoginInput';
import { loginSchema } from '@/features/auth/validation/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
export function useLogin() {
  const form = useForm<ILoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });
  const mutation = useMutation({ mutationFn: login });
  return { form, mutation };
}
