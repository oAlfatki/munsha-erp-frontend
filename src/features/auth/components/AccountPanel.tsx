import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { authApi } from '@/features/auth/api/auth-api';
import { revokeOtherSessions } from '@/features/auth/services/revoke-other-sessions';
import type { PasswordChangeValues } from '@/features/auth/types/PasswordChangeValues';
import { passwordChangeSchema } from '@/features/auth/validations/password-change-schema';
import { Field } from '@/shared/ui/forms/Field';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export function AccountPanel({ mode = 'password' }: { mode?: 'password' | 'sessions' }) {

  const auth = useAuth(),
    client = useQueryClient();
  const [page, setPage] = useState(1),
    [message, setMessage] = useState('');
  const lock = useRef(false);
  const form = useForm<PasswordChangeValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirm: '' },
    shouldUnregister: true,
  });
  const query = useQuery({
    queryKey: ['auth', 'sessions', auth.user?.userId, page],

    queryFn: ({ signal }) => authApi.sessions(page, signal),

    enabled: mode === 'sessions' && !!auth.user,
    retry: false,
  });
  const password = useMutation({
    gcTime: 0,
    mutationFn: authApi.changePassword,

    onSuccess: async () => {

      form.reset();
      setMessage('حُفظت كلمة المرور.');
      await auth.refreshIdentity();
    },
  });
  const others = useMutation({
    mutationFn: revokeOtherSessions,

    onSettled: async () => {

      await client.invalidateQueries({ queryKey: ['auth', 'sessions'] });
    },
  });
  const revoke = useMutation({
    mutationFn: async (session: { id: string; isCurrent: boolean } | null) => {

      if (!session) {
        await authApi.revokeAllSessions();
        await auth.clearSession();
      } else {
        await authApi.revokeSession(session.id);
        if (session.isCurrent) await auth.clearSession();
      }
    },

    onSuccess: async () => {

      await client.invalidateQueries({ queryKey: ['auth', 'sessions'] });
    },
  });
  return (
    <>
      <PageHead
        title={mode === 'password' ? 'تغيير كلمة المرور' : 'جلساتي'}
        description={
          mode === 'password'
            ? 'أدخل كلمة المرور الحالية والجديدة.'
            : 'جلسات حسابك والأجهزة المرتبطة به.'
        }
      />
      {message && <p role="status">{message}</p>}
      {mode === 'sessions' && (
        <>
          <Button
            disabled={others.isPending || revoke.isPending || query.isPending}
            onClick={() => others.mutate()}
          >
            إنهاء جلساتي الأخرى
          </Button>
          {others.error && <p role="alert">{errorMessage(others.error)}</p>}
          {others.isSuccess && <p role="status">تم إنهاء {others.data.revokedCount} جلسة أخرى.</p>}
        </>
      )}
      {mode === 'password' ? (
        <form
          noValidate
          onSubmit={form.handleSubmit(async (values) => {
            if (lock.current) return;
            lock.current = true;
            try {
              await password.mutateAsync(values);
            } catch (e) {
              form.setError('root', { message: errorMessage(e) });
            } finally {
              lock.current = false;
              form.setValue('currentPassword', '');
              form.setValue('newPassword', '');
              form.setValue('confirm', '');
              password.reset();
            }
          })}
          className="auth-form"
        >
          <Field label="كلمة المرور الحالية *">
            <Input
              type="password"
              autoComplete="current-password"
              {...form.register('currentPassword')}
            />
          </Field>
          <Field label="كلمة المرور الجديدة *">
            <Input type="password" autoComplete="new-password" {...form.register('newPassword')} />
          </Field>
          <Field label="تأكيد كلمة المرور الجديدة *">
            <Input type="password" autoComplete="new-password" {...form.register('confirm')} />
          </Field>
          {Object.entries(form.formState.errors).map(([key, e]) => (
            <p role="alert" key={key}>
              {e.message}
            </p>
          ))}
          <Button disabled={password.isPending || form.formState.isSubmitting}>
            حفظ كلمة المرور
          </Button>
        </form>
      ) : (
        <>
          <div className="dialog-actions">
            <Button onClick={() => void query.refetch()}>تحديث الجلسات</Button>
            <Button
              disabled={revoke.isPending || others.isPending}
              onClick={() => revoke.mutate(null)}
            >
              إنهاء جميع جلساتي وتسجيل الخروج
            </Button>
          </div>
          {query.isPending ? (
            <p role="status">جارٍ تحميل الجلسات…</p>
          ) : query.error ? (
            <p role="alert">{errorMessage(query.error)}</p>
          ) : (
            <>
              <table className="data-table">
                <thead>
                  <tr>
                    {['الجلسة', 'الجهاز', 'آخر نشاط', 'الإجراء'].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {query.data?.items.map((s) => (
                    <tr key={s.id}>
                      <td>{s.isCurrent ? 'الجلسة الحالية' : 'جلسة أخرى'}</td>
                      <td>{s.deviceName || s.browser || 'غير متوفر'}</td>
                      <td>
                        {s.lastActivityAtUtc
                          ? new Date(s.lastActivityAtUtc).toLocaleString('ar-YE')
                          : 'غير متوفر'}
                      </td>
                      <td>
                        <Button
                          disabled={revoke.isPending || others.isPending}
                          onClick={() => revoke.mutate(s)}
                        >
                          إنهاء الجلسة
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!query.data?.items.length && <p>لا توجد جلسات.</p>}
              <div className="dialog-actions">
                <Button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                  السابق
                </Button>
                <span>الصفحة {page}</span>
                <Button
                  disabled={!query.data || page * query.data.pageSize >= query.data.totalCount}
                  onClick={() => setPage((p) => p + 1)}
                >
                  اللاحق
                </Button>
              </div>
            </>
          )}
          {revoke.error && <p role="alert">{errorMessage(revoke.error)}</p>}
        </>
      )}
    </>
  );
}
