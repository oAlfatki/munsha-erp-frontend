import { useAuth } from '@/core/auth/AuthProvider';
import { errorMessage } from '@/core/api/error-message';
import { usersApi } from '@/features/users/api/users-api';
import { resetPasswordSchema } from '@/features/users/validation/user-form-schema';
import { Field } from '@/shared/ui/forms/Field';
import { Input } from '@/shared/ui/primitives/input';
import { Button } from '@/shared/ui/primitives/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
export function UserAccountOperations({ id, branchId }: { id: number; branchId: number }) {
  const auth = useAuth(),
    client = useQueryClient();
  const [page, setPage] = useState(1),
    [message, setMessage] = useState('');
  const lock = useRef(false);
  const can = (code: string) => auth.can('USERS', code, String(branchId));
  const sessions = useQuery({
    queryKey: ['users', auth.user?.userId, id, 'sessions', page],
    queryFn: ({ signal }) => usersApi.sessions(id, page, signal),
    enabled: can('USERS_SESSIONS_VIEW'),
    retry: false,
  });
  const permissions = useQuery({
    queryKey: ['users', auth.user?.userId, id, 'granted-permissions'],
    queryFn: ({ signal }) => usersApi.permissions(id, signal),
    enabled: can('USERS_PERMISSIONS_VIEW'),
    retry: false,
  });
  const form = useForm<{ id: number; newPassword: string }>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { id, newPassword: '' },
    shouldUnregister: false,
  });
  const reset = useMutation({
    gcTime: 0,
    mutationFn: async (input: { id: number; newPassword: string }) => {
      if (!can('USERS_PASSWORD_RESET')) throw Error('لا تملك صلاحية إعادة تعيين كلمة المرور.');
      await usersApi.resetPassword({ id, newPassword: input.newPassword });
    },
    onSuccess: async () => {
      setMessage('تمت إعادة تعيين كلمة المرور.');
      await client.invalidateQueries({ queryKey: ['users'] });
    },
  });
  const revoke = useMutation({
    mutationFn: async (session: { id: string; isCurrent: boolean } | null) => {
      if (!can('USERS_SESSIONS_REVOKE')) throw Error('لا تملك صلاحية إنهاء الجلسات.');
      if (session) {
        await usersApi.revokeSession(id, session.id);
        if (session.isCurrent) await auth.clearSession();
      } else {
        await usersApi.revokeAllSessions(id);
        if (String(id) === auth.user?.userId) await auth.clearSession();
      }
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ['users'] });
    },
  });
  return (
    <>
      {can('USERS_PERMISSIONS_VIEW') && (
        <section>
          <h2>الصلاحيات الممنوحة</h2>
          {permissions.error ? (
            <p role="alert">{errorMessage(permissions.error)}</p>
          ) : permissions.isPending ? (
            <p role="status">جارٍ تحميل الصلاحيات…</p>
          ) : permissions.data &&
            permissions.data.userId === id &&
            permissions.data.branchId === branchId ? (
            <ul>
              {permissions.data.permissions.map((p) => (
                <li key={p.moduleCode}>
                  <bdi>
                    {p.moduleCode}: {p.mask}
                  </bdi>
                </li>
              ))}
            </ul>
          ) : (
            <p role="alert">تعذر التحقق من نطاق الصلاحيات المستلمة.</p>
          )}
        </section>
      )}
      {can('USERS_PASSWORD_RESET') && (
        <section>
          <h2>إعادة تعيين كلمة المرور</h2>
          <form
            noValidate
            onSubmit={form.handleSubmit(async (input) => {
              if (lock.current) return;
              lock.current = true;
              setMessage('');
              try {
                await reset.mutateAsync(input);
              } catch (e) {
                form.setError('root', { message: errorMessage(e) });
              } finally {
                form.setValue('newPassword', '');
                reset.reset();
                lock.current = false;
              }
            })}
          >
            <Field label="كلمة المرور الجديدة *">
              <Input
                type="password"
                autoComplete="new-password"
                {...form.register('newPassword')}
              />
            </Field>
            {Object.entries(form.formState.errors).map(([key, error]) => (
              <p key={key} role="alert">
                {error.message}
              </p>
            ))}
            <Button disabled={reset.isPending || form.formState.isSubmitting}>
              تأكيد إعادة التعيين
            </Button>
            {message && <p role="status">{message}</p>}
          </form>
        </section>
      )}
      {can('USERS_SESSIONS_VIEW') && (
        <section>
          <h2>جلسات المستخدم</h2>
          {sessions.error ? (
            <p role="alert">{errorMessage(sessions.error)}</p>
          ) : sessions.isPending ? (
            <p role="status">جارٍ تحميل الجلسات…</p>
          ) : (
            <>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>الجهاز</th>
                    <th>آخر نشاط</th>
                    <th>الجلسة الحالية</th>
                    <th>الإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.data?.items.map((s) => (
                    <tr key={s.id}>
                      <td>{s.deviceName || s.browser || 'غير متوفر'}</td>
                      <td>
                        {s.lastActivityAtUtc
                          ? new Date(s.lastActivityAtUtc).toLocaleString('ar-YE')
                          : 'غير متوفر'}
                      </td>
                      <td>{s.isCurrent ? 'نعم' : 'لا'}</td>
                      <td>
                        {can('USERS_SESSIONS_REVOKE') && (
                          <Button disabled={revoke.isPending} onClick={() => revoke.mutate(s)}>
                            إنهاء الجلسة
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!sessions.data?.items.length && <p>لا توجد جلسات.</p>}
              <Button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                السابق
              </Button>
              <span>الصفحة {page}</span>
              <Button
                disabled={!sessions.data || page * 20 >= sessions.data.totalCount}
                onClick={() => setPage((p) => p + 1)}
              >
                اللاحق
              </Button>
            </>
          )}
          {can('USERS_SESSIONS_REVOKE') && (
            <Button
              disabled={revoke.isPending}
              onClick={() => {
                if (window.confirm('هل تريد إنهاء جميع جلسات هذا المستخدم؟')) revoke.mutate(null);
              }}
            >
              إنهاء جميع جلسات المستخدم
            </Button>
          )}
          {revoke.error && <p role="alert">{errorMessage(revoke.error)}</p>}
        </section>
      )}
    </>
  );
}
