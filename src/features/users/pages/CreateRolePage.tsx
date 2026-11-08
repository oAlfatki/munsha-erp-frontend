import { useAuth } from '@/core/auth/AuthProvider';
import { ROUTES } from '@/core/config/navigation-paths';
import { RoleEditor } from '@/features/users/components/roles/RoleEditor';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { useNavigate } from 'react-router-dom';

export default function CreateRolePage() {

  const auth = useAuth();
  const navigate = useNavigate();
  if (!auth.canFeature('USERS', 'ROLES', 'USERS_ROLES_CREATE'))
    return <p role="alert">لا تملك صلاحية إضافة الأدوار.</p>;
  return (
    <>
      <PageHead title="إضافة دور" description="تعريف صلاحيات دور يمكن إسناده إلى المستخدمين." />
      <RoleEditor
        onSaved={() => navigate(ROUTES.USERS_ROLES)}
        onCancel={() => navigate(ROUTES.USERS_ROLES)}
      />
    </>
  );
}
