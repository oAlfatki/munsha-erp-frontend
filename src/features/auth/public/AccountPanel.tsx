import { ROUTES } from '@/core/config/navigation-paths';
import { useAccountAction } from '@/features/auth/hooks/useAccountAction';
import { useAccountQuery } from '@/features/auth/hooks/useAccountQuery';
import { useChangePasswordForm } from '@/features/auth/hooks/useChangePasswordForm';
import type { AccountCommand } from '@/features/auth/types/AccountCommand';
import type { AccountPanelProps } from '@/features/auth/types/AccountPanelProps';
import { Field } from '@/shared/ui/forms/Field';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { useState } from 'react';

export function AccountPanel({ mode = 'password', user }: AccountPanelProps) {
  const account = useAccountQuery();
  const data = account.data || (user ? { user, sessions: [] } : null);
  const [error, setError] = useState(''),
    [current, setCurrent] = useState(''),
    [password, setPassword] = useState(''),
    [confirm, setConfirm] = useState('');
  const handleLoad = async () => {
    const result = await account.refetch();
    if (result.error) setError(result.error.message);
  };
  const authAction = useAccountAction();
  const isBusy = authAction.isPending;
  const passwordForm = useChangePasswordForm();
  async function action(p: AccountCommand) {
    setError('');
    try {
      await authAction.mutateAsync(p);
      await handleLoad();
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <>
      {data?.user.mustChange && (
        <Button
          variant="outline"
          onClick={async () => {
            await authAction.mutateAsync({ operation: 'logout' });
            window.location.href = ROUTES.LOGIN;
          }}
        >
          تسجيل الخروج
        </Button>
      )}
      <PageHead
        title={mode === 'password' ? 'تغيير كلمة المرور' : 'الجلسات النشطة'}
        description={
          mode === 'password'
            ? 'بعد تغيير كلمة المرور تنتهي جميع جلسات حسابك ويلزم الدخول مجددًا.'
            : 'تنتهي الجلسة بعد 30 دقيقة من عدم النشاط أو بعد 12 ساعة من الدخول.'
        }
      />
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      {mode === 'password' ? (
        data?.user.kind === 'owner' ? (
          <p className="info-note">
            حسابك الحالي يستخدم دخول ChatGPT. أنشئ حسابًا مستقلًا من قائمة المستخدمين لاستخدام كلمة
            مرور خاصة بالنظام. كلمة مرور ChatGPT تُغيّر من إعدادات حساب ChatGPT.
          </p>
        ) : (
          <ValidatedForm
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              passwordForm.reset({ current, password, confirm });
              void passwordForm.handleSubmit(
                (values) => action({ operation: 'changePassword', input: values }),
                (errors) =>
                  setError(
                    Object.values(errors)
                      .map((error) => String(error.message || 'راجع كلمة المرور'))
                      .join('\n'),
                  ),
              )();
            }}
          >
            <Field label="كلمة المرور الحالية *">
              <Input
                type="password"
                autoComplete="current-password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              />
            </Field>
            <Field label="كلمة المرور الجديدة — 10 أحرف على الأقل *">
              <Input
                type="password"
                autoComplete="new-password"
                minLength={10}
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Field label="تأكيد كلمة المرور الجديدة *">
              <Input
                type="password"
                autoComplete="new-password"
                minLength={10}
                maxLength={128}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </Field>
            <Button disabled={isBusy}>حفظ كلمة المرور</Button>
          </ValidatedForm>
        )
      ) : (
        <>
          <div className="dialog-actions">
            <Button variant="outline" onClick={handleLoad}>
              تحديث الجلسات
            </Button>
            {data?.user.kind === 'local' && (
              <Button
                disabled={isBusy}
                onClick={() => action({ operation: 'revokeOtherSessions' })}
              >
                إنهاء جلساتي الأخرى
              </Button>
            )}
          </div>
          <DataTable
            headers={['المستخدم', 'بداية الجلسة', 'آخر نشاط', 'الجهاز', 'الإجراء']}
            rows={(data?.sessions || []).map((s) => [
              s.name + (s.id === data?.user.sessionId ? ' — الجلسة الحالية' : ''),
              new Date(s.created_at).toLocaleString('ar-YE'),
              new Date(s.last_seen).toLocaleString('ar-YE'),
              s.device,
              <Button
                key={s.id}
                disabled={isBusy}
                variant="outline"
                onClick={() => action({ operation: 'revokeSession', id: s.id })}
              >
                إنهاء الجلسة
              </Button>,
            ])}
          />
          {data?.user.kind === 'owner' && (
            <p className="info-note">
              هذه جلسات حسابات النظام المستقلة. جلسة مالك الموقع بحساب ChatGPT تُدار من زر تسجيل
              الخروج.
            </p>
          )}
        </>
      )}
    </>
  );
}
