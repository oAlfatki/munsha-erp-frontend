import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { useUserEditor } from '@/features/users/hooks/useUserEditor';
import { fetchPermissionCatalog } from '@/features/users/services/permission-catalog';
import type { UserEditorProps } from '@/features/users/types/props/UserEditorProps';
import { Button } from '@/shared/ui/primitives/button';
import { useQuery } from '@tanstack/react-query';
import { PermissionAssignmentEditor } from '@/features/users/components/roles/PermissionAssignmentEditor';
import type { PermissionAssignmentDraft } from '@/features/users/types/PermissionAssignmentDraft';
import { UserFormFields } from './UserFormFields';

export function UserEditor({ user, onSaved, onCancel }: UserEditorProps) {

  const auth = useAuth();
  const catalog = useQuery({
    queryKey: ['permissions', 'catalog', auth.user?.userId],

    queryFn: ({ signal }) => fetchPermissionCatalog(signal),

    enabled: !user,
    retry: false,
  });
  const editor = useUserEditor(user, onSaved, catalog.data);
  const values = editor.form.watch();
  const assignment: PermissionAssignmentDraft =
    values.assignmentMode === 'role'
      ? {
          mode: 'role',
          role: values.role || null,
          additionalPermissions: values.additionalPermissions || [],
          excludedPermissions: values.excludedPermissions || [],
        }
      : { mode: 'direct', permissions: values.permissions };

  const changeAssignment = (value: PermissionAssignmentDraft) => {

    editor.form.setValue('assignmentMode', value.mode);
    if (value.mode === 'direct') editor.form.setValue('permissions', value.permissions);
    else {
      editor.form.setValue('role', value.role || undefined);
      editor.form.setValue('additionalPermissions', value.additionalPermissions);
      editor.form.setValue('excludedPermissions', value.excludedPermissions);
    }
    void editor.form.trigger([
      'permissions',
      'role',
      'assignmentMode',
      'additionalPermissions',
      'excludedPermissions',
    ]);
  };

  return (
    <form onSubmit={editor.submit} noValidate>
      <UserFormFields form={editor.form} isEditing={!!user} />
      {!user &&
        (catalog.data ? (
          <PermissionAssignmentEditor
            catalog={catalog.data}
            value={assignment}
            allowed={auth.user?.permissions || []}
            onChange={changeAssignment}
            canAssignRole={auth.canFeature('USERS', 'ROLES', 'USERS_ROLES_ASSIGN')}
            isReadOnly={editor.isPending || editor.form.formState.isSubmitting}
          />
        ) : (
          <p role={catalog.error ? 'alert' : 'status'}>
            {catalog.error ? errorMessage(catalog.error) : 'جارٍ تحميل الصلاحيات…'}
          </p>
        ))}
      {!editor.hasVersion && (
        <p role="alert">
          لا يمكن الحفظ الآمن: عقد تفاصيل المستخدم لا يعيد رمز نسخة البيانات المطلوب للتعديل.
        </p>
      )}
      {editor.error && <p role="alert">{editor.error}</p>}
      <div className="dialog-actions">
        <Button
          disabled={
            editor.isPending ||
            editor.form.formState.isSubmitting ||
            !editor.hasVersion ||
            (!user && !catalog.data)
          }
        >
          حفظ المستخدم
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          تراجع
        </Button>
      </div>
    </form>
  );
}
