import { Pagination } from '@/shared/ui/navigation/Pagination';
import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { ROUTES } from '@/core/config/navigation-paths';
import { useRolesQuery } from '@/features/users/queries/roles-query';
import { Field } from '@/shared/ui/forms/Field';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Input } from '@/shared/ui/primitives/input';
import { Button } from '@/shared/ui/primitives/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleListPage() {

  const auth = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const query = useRolesQuery({
    page,
    pageSize: 20,
    branchId: Number(auth.user?.branchId),
    search: search || undefined,
  });
  return (
    <>
      <PageHead
        title="الأدوار"
        description="أدوار قابلة لإعادة الاستخدام مع صلاحيات القسم والميزة والعملية."
        extra={
          auth.canFeature('USERS', 'ROLES', 'USERS_ROLES_CREATE') ? (
            <Button onClick={() => navigate(ROUTES.USERS_ROLES_NEW)}>إضافة دور</Button>
          ) : undefined
        }
      />
      {!auth.canFeature('USERS', 'ROLES', 'USERS_ROLES_VIEW') ? (
        <p role="alert">لا تملك صلاحية عرض الأدوار.</p>
      ) : (
        <>
          <Field label="البحث عن دور">
            <Input
              value={search}
              maxLength={200}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </Field>
          {query.error || query.capabilityError ? (
            <p role="alert">{errorMessage(query.error || query.capabilityError)}</p>
          ) : query.hasRolesSupport === false ? (
            <p role="alert">إدارة الأدوار تتطلب دعم عقد الأدوار على الخادم.</p>
          ) : query.isPending ? (
            <p role="status">جارٍ تحميل الأدوار…</p>
          ) : (
            <>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>الدور</th>
                    <th>الفرع</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {query.data?.items.map((role) => (
                    <tr key={role.id}>
                      <td>{role.name}</td>
                      <td>{role.branchId}</td>
                      <td>
                        {auth.canFeature(
                          'USERS',
                          'ROLES',
                          'USERS_ROLES_UPDATE',
                          String(role.branchId),
                        ) && (
                          <Button
                            variant="outline"
                            onClick={() => navigate('/users/roles/' + role.id + '/edit')}
                          >
                            تعديل الدور
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!query.data?.items.length && <p>لا توجد أدوار مطابقة.</p>}
              <Pagination
                page={page}
                onPageChange={setPage}
                hasNext={!!query.data && page * 20 < query.data.totalCount}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
