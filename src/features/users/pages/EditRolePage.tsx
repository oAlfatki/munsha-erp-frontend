import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { ROUTES } from '@/core/config/navigation-paths';
import { RoleEditor } from '@/features/users/components/roles/RoleEditor';
import { useRoleQuery } from '@/features/users/queries/roles-query';
import { NotFoundPage } from '@/shared/ui/feedback/NotFoundPage';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditRolePage() {

  const auth = useAuth();
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const query = useRoleQuery(id);
  if (!Number.isSafeInteger(id) || id < 1) return <NotFoundPage />;
  if (!auth.canFeature('USERS', 'ROLES', 'USERS_ROLES_UPDATE'))
    return <p role="alert">لا تملك صلاحية تعديل الأدوار.</p>;
  if (query.error || query.capabilityError)
    return <p role="alert">{errorMessage(query.error || query.capabilityError)}</p>;
  if (query.hasRolesSupport === false)
    return <p role="alert">إدارة الأدوار تتطلب دعم عقد الأدوار على الخادم.</p>;
  if (query.isPending) return <p role="status">جارٍ تحميل الدور…</p>;
  return (
    <>
      <PageHead
        title="تعديل الدور"
        description="تغيير الدور يغيّر الصلاحيات الموروثة للمستخدمين المرتبطين به على الخادم."
      />
      <RoleEditor
        key={query.data.id + query.data.rowVersion}
        role={query.data}
        onSaved={() => navigate(ROUTES.USERS_ROLES)}
        onCancel={() => navigate(ROUTES.USERS_ROLES)}
      />
    </>
  );
}
