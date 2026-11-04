import { useUserEditor } from '@/features/users/hooks/useUserEditor';
import type { UserEditorProps } from '@/features/users/types/UserEditorProps';
import { Button } from '@/shared/ui/primitives/button';
import { UserFormFields } from './UserFormFields';
export function UserEditor({ user, onSaved, onCancel }: UserEditorProps) {
  const editor = useUserEditor(user, onSaved);
  return (
    <form onSubmit={editor.submit} noValidate>
      <UserFormFields form={editor.form} isEditing={!!user} />
      {editor.error && (
        <p role="alert" className="field-error">
          {editor.error}
        </p>
      )}
      <div className="dialog-actions">
        <Button disabled={editor.isPending}>حفظ المستخدم</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          تراجع
        </Button>
      </div>
    </form>
  );
}
