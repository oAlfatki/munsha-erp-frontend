import { Pagination } from '@/shared/ui/navigation/Pagination';
import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { usersApi } from '@/features/users/api/users-api';
import type { AuditFilters } from '@/features/users/types/AuditFilters';
import { Field } from '@/shared/ui/forms/Field';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function UserAuditReport() {

  const auth = useAuth();
  const [page, setPage] = useState(1),
    [search, setSearch] = useState(''),
    [actor, setActor] = useState(''),
    [event, setEvent] = useState(''),
    [from, setFrom] = useState(''),
    [to, setTo] = useState(''),
    [file, setFile] = useState('');
  const filters: AuditFilters = {
    page,
    pageSize: 20,
    branchId: Number(auth.user?.branchId),
    search: search || undefined,
    eventCode: event || undefined,
    actorUserId: actor ? Number(actor) : undefined,
    fromUtc: from ? new Date(from).toISOString() : undefined,
    toUtc: to ? new Date(to).toISOString() : undefined,
    sortDirection: 'desc',
  };
  const isValid =
    (!actor || (Number.isSafeInteger(Number(actor)) && Number(actor) > 0)) &&
    (!from || !to || from <= to);
  const query = useQuery({
    queryKey: ['users', auth.user?.userId, 'audit', filters],

    queryFn: ({ signal }) => usersApi.audit(filters, signal),

    enabled: auth.can('USERS', 'USERS_AUDIT_VIEW') && isValid,
    retry: false,
  });
  const report = useMutation({
    mutationFn: async (kind: 'print' | 'export') => {

      if (!auth.can('USERS', kind === 'print' ? 'USERS_AUDIT_PRINT' : 'USERS_AUDIT_EXPORT'))
        throw Error('لا تملك صلاحية هذه العملية.');
      return usersApi.auditReport(kind, filters);
    },

    onSuccess: (blob) => {

      setFile(URL.createObjectURL(blob));
    },
  });
  useEffect(
    () => () => {
      if (file) URL.revokeObjectURL(file);
    },
    [file],
  );

  const change = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setPage(1);
  };

  return (
    <>
      <PageHead
        title="حركات المستخدمين"
        description="سجل الأحداث وهوية الفاعل كما يوفرهما الخادم."
      />
      {!auth.can('USERS', 'USERS_AUDIT_VIEW') ? (
        <p role="alert">لا تملك صلاحية عرض الأنشطة.</p>
      ) : (
        <>
          <div className="filter-bar">
            <Field label="البحث">
              <Input value={search} maxLength={200} onChange={change(setSearch)} />
            </Field>
            <Field label="معرّف المستخدم الفاعل">
              <Input type="number" min="1" value={actor} onChange={change(setActor)} />
            </Field>
            <Field label="رمز الإجراء">
              <Input value={event} onChange={change(setEvent)} />
            </Field>
            <Field label="من">
              <Input type="datetime-local" value={from} onChange={change(setFrom)} />
            </Field>
            <Field label="إلى">
              <Input type="datetime-local" value={to} onChange={change(setTo)} />
            </Field>
          </div>
          {!isValid ? (
            <p role="alert">راجع معرّف المستخدم ونطاق التاريخ.</p>
          ) : query.error ? (
            <p role="alert">{errorMessage(query.error)}</p>
          ) : query.isPending ? (
            <p role="status">جارٍ تحميل الأنشطة…</p>
          ) : (
            <>
              <table className="data-table">
                <thead>
                  <tr>
                    {['التاريخ والوقت', 'الإجراء', 'المرجع', 'الفاعل', 'النتيجة'].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {query.data?.items
                    .filter((a) => !a.branchId || String(a.branchId) === auth.user?.branchId)
                    .map((a) => (
                      <tr key={a.id}>
                        <td>{new Date(a.occurredAtUtc).toLocaleString('ar-YE')}</td>
                        <td>{a.eventCode}</td>
                        <td>{a.targetId || 'غير متوفر'}</td>
                        <td>
                          {a.actor?.fullName || a.actor?.username || 'هوية الفاعل غير متوفرة'}
                        </td>
                        <td>{a.outcome === 'Success' ? 'نجاح' : 'فشل'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {!query.data?.items.length && <p>لا توجد أنشطة مطابقة.</p>}
              <Pagination
                page={page}
                onPageChange={setPage}
                hasNext={!!query.data && page * 20 < query.data.totalCount}
              />
            </>
          )}
          <div className="dialog-actions">
            {auth.can('USERS', 'USERS_AUDIT_PRINT') && (
              <Button
                disabled={!isValid || report.isPending}
                onClick={() => report.mutate('print')}
              >
                طباعة
              </Button>
            )}
            {auth.can('USERS', 'USERS_AUDIT_EXPORT') && (
              <Button
                disabled={!isValid || report.isPending}
                onClick={() => report.mutate('export')}
              >
                تصدير PDF
              </Button>
            )}
            {file && (
              <a
                href={file}
                download={report.variables === 'print' ? undefined : 'Munsha_User_Activities.pdf'}
                target={report.variables === 'print' ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                {report.variables === 'print' ? 'فتح التقرير للطباعة' : 'تحميل التقرير'}
              </a>
            )}
          </div>
          {report.error && <p role="alert">{errorMessage(report.error)}</p>}
        </>
      )}
    </>
  );
}
