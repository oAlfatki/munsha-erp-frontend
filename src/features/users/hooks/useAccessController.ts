import { useErpContext } from '@/core/hooks/useErpContext';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { getAccount } from '@/features/auth/services/auth-service';
import type { AuthUser } from '@/features/auth/types/models/AuthUser';
import { useUserAction } from '@/features/users/hooks/useUserAction';
import type { IUserFormInput } from '@/features/users/types/IUserFormInput';
import { resetPasswordSchema, userFormSchema } from '@/features/users/validation/user-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
export const ACCESS_MODULES = [
  ['dashboard', 'لوحة المتابعة'],
  ['products', 'الأصناف'],
  ['inventory', 'المخزون'],
  ['customers', 'العملاء'],
  ['suppliers', 'الموردون'],
  ['sales', 'المبيعات'],
  ['purchases', 'المشتريات'],
  ['expenses', 'المصروفات'],
  ['employees', 'الموظفون'],
  ['accounts', 'الحسابات'],
  ['financial', 'القوائم المالية'],
  ['settings', 'الإعدادات'],
] as const;
export function useAccessController() {
  const { view, user: sessionUser } = useErpContext();
  const [error, setError] = useState('');

  const [edit, setEdit] = useState<AuthUser | null>(null);
  const [reset, setReset] = useState<AuthUser | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('staff');
  const [isActive, setActive] = useState(true);
  const [success, setSuccess] = useState('');
  const account = useQuery({
    queryKey: ['auth', 'account', sessionUser?.userId, sessionUser?.kind],
    queryFn: getAccount,
  });
  const users = account.data?.users || [];
  const user = account.data?.user || null;
  const load = async () => {
    const result = await account.refetch();
    if (result.error) setError(result.error.message);
  };
  useEffect(() => {
    if (view.endsWith('/users-add') && user?.role === 'admin') start(null);
  }, [view, user?.role]);
  function start(u: AuthUser | null) {
    setEdit(u);
    setName(u?.name || '');
    setUsername(u?.username || '');
    setRole(u?.role || 'staff');
    setActive(u ? !!u.active : true);
    setPassword('');
    setError('');
    setSuccess('');
    setOpen(true);
  }
  const actions = useUserAction();
  const userForm = useForm<IUserFormInput>({ resolver: zodResolver(userFormSchema) });
  const resetForm = useValidatedForm(
    resetPasswordSchema,
    async (input: { id: string; password: string; action: string }) => {
      await actions.mutateAsync(input);
      return true;
    },
  );
  const isBusy = actions.isPending;
  async function save() {
    setError('');
    setSuccess('');
    userForm.reset({ id: edit?.id, name, username, password, role, active: isActive });
    await userForm.handleSubmit(
      async () => {
        try {
          await actions.mutateAsync(
            edit
              ? { action: 'update', id: edit.id, name, role, active: isActive }
              : { action: 'create', name, username, password, role },
          );
          setOpen(false);
          setPassword('');
          setSuccess(
            edit
              ? 'حُفظ المستخدم وأُنهيت جلساته السابقة.'
              : 'أُنشئ المستخدم. يلزمه تغيير كلمة المرور المؤقتة عند أول دخول.',
          );
        } catch (error) {
          setError(error instanceof Error ? error.message : 'تعذر حفظ المستخدم');
        }
      },
      (errors) => {
        setError(
          Object.values(errors)
            .map((error) => String(error.message || 'راجع بيانات المستخدم'))
            .join('\n'),
        );
      },
    )();
  }
  return {
    view,
    sessionUser,
    users,
    user,
    error: error || account.error?.message || '',
    setError,
    isBusy,
    edit,
    reset,
    setReset,
    isOpen,
    setOpen,
    name,
    setName,
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    isActive,
    setActive,
    success,
    setSuccess,
    load,
    start,
    save,
    executeAction: actions.mutateAsync,
    submitPasswordReset: resetForm.submit,
    isLoading: account.isPending,
  };
}
