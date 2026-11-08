import { errorMessage } from '@/core/api/error-message';
import { PermissionAssignmentEditor } from '@/features/users/components/roles/PermissionAssignmentEditor';
import { useUserAuthorizationEditor } from '@/features/users/hooks/useUserAuthorizationEditor';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { useSearchParams } from 'react-router-dom';

export default function UserPermissionsPage() {

  const [params] = useSearchParams();
  const id = Number(params.get('userId'));
  const model = useUserAuthorizationEditor(id);
  const {
    auth,
    canView,
    canManage,
    canAssignRole,
    catalog,
    query,
    value,
    draft,
    setDraft,
    mutation,
  } = model;
  return (
    <>
      <PageHead
        title="صلاحيات المستخدم"
        description="صلاحيات مباشرة أو دور مع إضافات واستثناءات على مستوى القسم والميزة والعملية."
      />
      {!canView ? (
        <p role="alert">لا تملك صلاحية عرض الصلاحيات.</p>
      ) : !Number.isSafeInteger(id) || id < 1 ? (
        <p>اختر مستخدمًا من قائمة المستخدمين لعرض صلاحياته.</p>
      ) : model.hasForeignData ? (
        <p role="alert">لا يمكن عرض صلاحيات خارج نطاق الفرع المسموح.</p>
      ) : query.error || catalog.error ? (
        <p role="alert">{errorMessage(query.error || catalog.error)}</p>
      ) : query.isPending || catalog.isPending ? (
        <p role="status">جارٍ تحميل الصلاحيات…</p>
      ) : value && catalog.data ? (
        <>
          <p>الفرع: {query.data.branchId}</p>
          <PermissionAssignmentEditor
            catalog={catalog.data}
            value={value}
            allowed={auth.user?.permissions || []}
            onChange={setDraft}
            canAssignRole={canAssignRole}
            isReadOnly={!canManage || mutation.isPending}
            isRoleSelectionLocked={query.data.assignment.mode === 'role' && !canAssignRole}
          />
          <Button
            disabled={!draft || !canManage || mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            حفظ الصلاحيات
          </Button>
          {draft && (
            <Button
              type="button"
              variant="ghost"
              disabled={mutation.isPending}
              onClick={model.resetDraft}
            >
              إلغاء التغييرات وإعادة التحميل
            </Button>
          )}
          {mutation.error && <p role="alert">{errorMessage(mutation.error)}</p>}
        </>
      ) : null}
    </>
  );
}
