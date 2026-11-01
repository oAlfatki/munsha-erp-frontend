import type { IChangePasswordInput } from '@/features/auth/types/IChangePasswordInput';
import { passwordChangeSchema } from '@/features/auth/validation/password-change-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
export function useChangePasswordForm() {
  return useForm<IChangePasswordInput>({ resolver: zodResolver(passwordChangeSchema) });
}
