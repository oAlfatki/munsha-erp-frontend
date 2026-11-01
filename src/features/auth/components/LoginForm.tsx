import { useAuth } from '@/core/auth/AuthProvider';
import { Field } from '@/shared/ui/forms/Field';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { getAccount } from '@/features/auth/services/auth-service';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export function LoginForm() {
  const { form, mutation } = useLogin();
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const submit = form.handleSubmit(async (input) => {
    setError('');
    try {
      await mutation.mutateAsync(input);
      const result = await getAccount();
      auth.setUser(result.user);
      const from = location.state?.from;
      const target =
        typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')
          ? from
          : '/dashboard';
      navigate(target, { replace: true });
    } catch (e) {
      setError((e as Error).message);
    }
  });
  return (
    <>
      <form onSubmit={submit} noValidate className="auth-form">
        <Field label="اسم المستخدم *">
          <Input
            {...form.register('username')}
            autoComplete="username"
            dir="ltr"
            aria-invalid={!!form.formState.errors.username}
          />
        </Field>
        {form.formState.errors.username && (
          <p className="field-error" role="alert">
            {form.formState.errors.username.message}
          </p>
        )}
        <Field label="كلمة المرور *">
          <Input
            {...form.register('password')}
            autoComplete="current-password"
            type="password"
            aria-invalid={!!form.formState.errors.password}
          />
        </Field>
        {form.formState.errors.password && (
          <p className="field-error" role="alert">
            {form.formState.errors.password.message}
          </p>
        )}
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
        <Button disabled={mutation.isPending} type="submit">
          {mutation.isPending ? 'جارٍ الدخول…' : 'تسجيل الدخول'}
          <ArrowLeft size={18} />
        </Button>
      </form>
      <p className="login-limit">
        يُنشئ مسؤول المنشأة حسابات المستخدمين من «المستخدمون والصلاحيات».
      </p>
    </>
  );
}
