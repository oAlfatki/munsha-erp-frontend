import type { UserFormValues } from '@/features/users/type';
import { Field } from '@/shared/ui/forms/Field';
import { Input } from '@/shared/ui/primitives/input';
import type { UseFormReturn } from 'react-hook-form';
export function UserFormFields({
  form,
  isEditing,
}: {
  form: UseFormReturn<UserFormValues>;
  isEditing: boolean;
}) {
  return (
    <div className="form-grid">
      <Field label="الاسم الكامل *">
        <Input {...form.register('fullName')} />
      </Field>
      <Field label="اسم المستخدم *">
        <Input dir="ltr" autoComplete="off" {...form.register('username')} />
      </Field>
      {!isEditing && (
        <Field label="كلمة المرور *">
          <Input type="password" autoComplete="new-password" {...form.register('password')} />
        </Field>
      )}
      <Field label="الفرع">
        <Input value={form.getValues('branchId')} readOnly aria-label="الفرع المسموح" />
      </Field>
      {Object.entries(form.formState.errors)
        .filter(([key]) => key !== 'root')
        .map(([key, e]) => (
          <p role="alert" key={key}>
            {e.message || 'راجع البيانات'}
          </p>
        ))}
    </div>
  );
}
