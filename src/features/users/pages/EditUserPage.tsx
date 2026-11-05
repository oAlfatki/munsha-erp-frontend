import { useAuth } from '@/core/auth/AuthProvider';
import { errorMessage } from '@/core/api/error-message';
import { ROUTES } from '@/core/config/navigation-paths';
import { UserEditor } from '@/features/users/components/UserEditor';
import { useUserQuery } from '@/features/users/queries/users-query';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { useNavigate, useParams } from 'react-router-dom';
export default function EditUserPage() {
  const { id = '' } = useParams(),
    navigate = useNavigate(),
    auth = useAuth();
  const query = useUserQuery(Number(id));
  if (!auth.can('USERS', 'USERS_UPDATE') || !auth.can('USERS', 'USERS_VIEW'))
    return <p role="alert">لا تملك صلاحية التعديل.</p>;
  if (!Number.isSafeInteger(Number(id)) || Number(id) < 1)
    return <p role="alert">معرّف المستخدم غير صحيح.</p>;
  if (query.isPending) return <p role="status">جارٍ تحميل المستخدم…</p>;
  if (query.error) return <p role="alert">{errorMessage(query.error)}</p>;
  return (
    <>
      <PageHead title="تعديل المستخدم" description="تعديل الاسم واسم المستخدم دون كلمة المرور." />
      <UserEditor
        key={id}
        user={query.data}
        onSaved={() => navigate(ROUTES.USERS)}
        onCancel={() => navigate(ROUTES.USERS)}
      />
    </>
  );
}
