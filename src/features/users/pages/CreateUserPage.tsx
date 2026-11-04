import { useAuth } from '@/core/auth/AuthProvider';
import { ROUTES } from '@/core/config/navigation-paths';
import { AccessRules } from '@/features/users/components/AccessRules';
import { UserEditor } from '@/features/users/components/UserEditor';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { useNavigate } from 'react-router-dom';
export default function CreateUserPage() {
  const { user } = useAuth(),
    navigate = useNavigate();
  return (
    <>
      <PageHead title="إضافة مستخدم" description="حساب دخول مستقل وصلاحية معتمدة." />
      <AccessRules />
      {user?.role === 'admin' ? (
        <UserEditor
          onSaved={() => navigate(ROUTES.USERS)}
          onCancel={() => navigate(ROUTES.USERS)}
        />
      ) : (
        <p className="info-note">إدارة حسابات المستخدمين متاحة لمسؤول النظام.</p>
      )}
    </>
  );
}
