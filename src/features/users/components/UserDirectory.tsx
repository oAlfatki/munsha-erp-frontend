import { useAuth } from '@/core/auth/AuthProvider';
import { errorMessage } from '@/core/api/error-message';
import { ROUTES } from '@/core/config/navigation-paths';
import { useUsersQuery } from '@/features/users/queries/users-query';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export function UserDirectory() {
  const auth = useAuth(),
    navigate = useNavigate();
  const [page, setPage] = useState(1),
    [search, setSearch] = useState(''),
    [active, setActive] = useState('');
  const branchId = Number(auth.user?.branchId);
  const query = useUsersQuery({
    page,
    pageSize: 20,
    search,
    branchId,
    isActive: active === '' ? undefined : active === 'true',
  });
  return (
    <>
      <PageHead
        title="المستخدمون"
        description="حسابات المستخدمين وصلاحياتها حسب الفرع."
        extra={
          auth.can('USERS', 'USERS_CREATE') ? (
            <Button onClick={() => navigate(ROUTES.USERS_NEW)}>إضافة مستخدم</Button>
          ) : undefined
        }
      />
      {!auth.can('USERS', 'USERS_VIEW') ? (
        <p role="alert">لا تتوفر صلاحية عرض المستخدمين لهذا الحساب.</p>
      ) : (
        <>
          <div className="filter-bar">
            <Field label="البحث">
              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </Field>
            <Field label="حالة المستخدم">
              <Select
                value={active}
                onChange={(e) => {
                  setActive(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">الكل</option>
                <option value="true">نشط</option>
                <option value="false">معطل</option>
              </Select>
            </Field>
            <Field label="الفرع">
              <Input value={branchId} readOnly />
            </Field>
          </div>
          {query.isPending ? (
            <p role="status">جارٍ تحميل المستخدمين…</p>
          ) : query.error ? (
            <p role="alert">{errorMessage(query.error)}</p>
          ) : (
            <>
              <div className="table-card">
                <table className="data-table">
                  <thead>
                    <tr>
                      {['الاسم', 'اسم المستخدم', 'الفرع', 'الحالة', 'الإجراءات'].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {query.data?.items.map((u) => (
                      <tr key={u.id}>
                        <td>{u.fullName}</td>
                        <td>{u.username}</td>
                        <td>{u.branchName}</td>
                        <td>{u.isActive ? 'نشط' : 'معطل'}</td>
                        <td>
                          <Button variant="outline" onClick={() => navigate('/users/' + u.id)}>
                            عرض
                          </Button>
                          {auth.can('USERS', 'USERS_UPDATE', String(u.branchId)) && (
                            <Button
                              variant="ghost"
                              onClick={() => navigate('/users/' + u.id + '/edit')}
                            >
                              تعديل
                            </Button>
                          )}
                          {auth.can('USERS', 'USERS_PERMISSIONS_VIEW', String(u.branchId)) && (
                            <Button
                              variant="ghost"
                              onClick={() => navigate(ROUTES.USERS_MATRIX + '?userId=' + u.id)}
                            >
                              الصلاحيات
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!query.data?.items.length && <p>لا توجد نتائج.</p>}
              </div>
              <div className="dialog-actions">
                <Button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                  السابق
                </Button>
                <span>
                  الصفحة {page} — {query.data?.totalCount || 0} مستخدم
                </span>
                <Button
                  disabled={!query.data || page * query.data.pageSize >= query.data.totalCount}
                  onClick={() => setPage((p) => p + 1)}
                >
                  اللاحق
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
