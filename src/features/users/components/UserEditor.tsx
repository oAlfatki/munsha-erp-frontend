import { useAuth } from '@/core/auth/AuthProvider';
import { errorMessage } from '@/core/api/error-message';
import { useUserEditor } from '@/features/users/hooks/useUserEditor';
import { fetchPermissionCatalog } from '@/features/users/public/permission-catalog';
import type { UserDetails } from '@/features/users/type';
import { PermissionMatrix } from './PermissionMatrix';
import { UserFormFields } from './UserFormFields';
import { Button } from '@/shared/ui/primitives/button';
import { useQuery } from '@tanstack/react-query';
export function UserEditor({
  user,
  onSaved,
  onCancel,
}: {
  user?: UserDetails;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const auth = useAuth(),
    editor = useUserEditor(user, onSaved);
  const catalog = useQuery({
    queryKey: ['permissions', 'catalog', auth.user?.userId],
    queryFn: ({ signal }) => fetchPermissionCatalog(signal),
    enabled: !user,
    retry: false,
  });
  const permissions = editor.form.watch('permissions');
  return (
    <form onSubmit={editor.submit} noValidate>
      <UserFormFields form={editor.form} isEditing={!!user} />
      {!user &&
        (catalog.data ? (
          <PermissionMatrix
            catalog={catalog.data}
            value={permissions}
            allowed={auth.user?.permissions || []}
            onChange={(v) => editor.form.setValue('permissions', v, { shouldValidate: true })}
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
