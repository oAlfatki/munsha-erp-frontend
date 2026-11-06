import { NotFoundPage } from '@/shared/ui/feedback/NotFoundPage';
import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { UserAccountOperations } from '@/features/users/components/UserAccountOperations';
import { useUserQuery } from '@/features/users/queries/users-query';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { useParams } from 'react-router-dom';
export default function ViewUserPage() {
  const auth = useAuth(),
    { id = '' } = useParams(),
    query = useUserQuery(Number(id));
  if (!auth.can('USERS', 'USERS_VIEW')) return <p role="alert">لا تملك صلاحية العرض.</p>;
  if (!Number.isSafeInteger(Number(id)) || Number(id) < 1) return <NotFoundPage />;
  if (query.isPending) return <p role="status">جارٍ تحميل المستخدم…</p>;
  if (query.error) return <p role="alert">{errorMessage(query.error)}</p>;
  const u = query.data!;
  return (
    <>
      <PageHead title="تفاصيل المستخدم" description="بيانات الحساب المسموح بعرضها." />
      <dl>
        <dt>الاسم</dt>
        <dd>{u.fullName}</dd>
        <dt>اسم المستخدم</dt>
        <dd>{u.username}</dd>
        <dt>الفرع</dt>
        <dd>{u.branchName}</dd>
        <dt>الحالة</dt>
        <dd>{u.isActive ? 'نشط' : 'معطل'}</dd>
        <dt>تاريخ الإنشاء</dt>
        <dd>{new Date(u.createdAtUtc).toLocaleString('ar-YE')}</dd>
      </dl>
      <UserAccountOperations key={u.id} id={u.id} branchId={u.branchId} />
    </>
  );
}
