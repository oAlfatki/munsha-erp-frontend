import { useAuth } from '@/core/auth/AuthProvider';
import { ROUTES } from '@/core/config/navigation-paths';
import { UserEditor } from '@/features/users/components/UserEditor';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { useNavigate } from 'react-router-dom';

export default function CreateUserPage() {

  const auth = useAuth(),
    navigate = useNavigate();
  return (
    <>
      <PageHead title="إضافة مستخدم" description="حساب دخول بكلمة مرور عادية وصلاحيات مباشرة." />
      {auth.can('USERS', 'USERS_CREATE') ? (
        <UserEditor
          onSaved={() => navigate(ROUTES.USERS)}
          onCancel={() => navigate(ROUTES.USERS)}
        />
      ) : (
        <p role="alert">لا تملك صلاحية إضافة المستخدمين.</p>
      )}
    </>
  );
}
