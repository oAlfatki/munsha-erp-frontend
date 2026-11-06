import { useLogin } from '@/features/auth/hooks/useLogin';
import { loginDestination } from '@/features/auth/services/login-destination';
import { Field } from '@/shared/ui/forms/Field';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function LoginForm() {

  const { form, submit, isPending } = useLogin();
  const navigate = useNavigate(),
    location = useLocation();
  return (
    <>
      <form
        onSubmit={submit(() => {
          const safe = loginDestination(location.state?.from);
          navigate(safe, { replace: true });
        })}
        noValidate
        aria-busy={isPending}
        className="auth-form"
      >
        <Field label="اسم المستخدم *">
          <Input
            {...form.register('username')}
            autoComplete="username"
            aria-invalid={!!form.formState.errors.username}
            aria-describedby={form.formState.errors.username ? 'login-username-error' : undefined}
            dir="ltr"
            disabled={isPending}
          />
        </Field>
        {form.formState.errors.username && (
          <p id="login-username-error" role="alert" className="field-error">
            {form.formState.errors.username.message}
          </p>
        )}
        <Field label="كلمة المرور *">
          <Input
            {...form.register('password')}
            autoComplete="current-password"
            aria-invalid={!!form.formState.errors.password}
            aria-describedby={form.formState.errors.password ? 'login-password-error' : undefined}
            type="password"
            disabled={isPending}
          />
        </Field>
        {form.formState.errors.password && (
          <p id="login-password-error" role="alert" className="field-error">
            {form.formState.errors.password.message}
          </p>
        )}
        {form.formState.errors.root && (
          <p role="alert" className="field-error">
            {form.formState.errors.root.message}
          </p>
        )}
        <Button disabled={isPending || form.formState.isSubmitting} type="submit">
          {isPending ? 'جارٍ الدخول…' : 'تسجيل الدخول'}
          <ArrowLeft size={18} />
        </Button>
      </form>
      <p className="login-limit">
        يُنشئ المستخدمون المصرح لهم حسابات الدخول من «المستخدمون والصلاحيات».
      </p>
    </>
  );
}
