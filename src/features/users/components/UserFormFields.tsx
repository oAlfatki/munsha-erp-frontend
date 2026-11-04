import type { UserFormFieldsProps } from '@/features/users/types/UserFormFieldsProps';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Input } from '@/shared/ui/primitives/input';
export function UserFormFields({ form, isEditing }: UserFormFieldsProps) {
  return (
    <div className="form-grid">
      <Field label="الاسم الكامل *">
        <Input {...form.register('name')} />
      </Field>
      <Field label="اسم الدخول *">
        <Input dir="ltr" autoComplete="off" readOnly={isEditing} {...form.register('username')} />
      </Field>
      <Field label="الصلاحية">
        <Select {...form.register('role')}>
          <option value="admin">مسؤول النظام</option>
          <option value="staff">مستخدم عمليات</option>
          <option value="viewer">مشاهدة فقط</option>
        </Select>
      </Field>
      {!isEditing && (
        <Field label="كلمة المرور المؤقتة *">
          <Input
            type="password"
            autoComplete="new-password"
            minLength={10}
            maxLength={128}
            {...form.register('password')}
          />
        </Field>
      )}
      {isEditing && (
        <label className="check-label">
          <input type="checkbox" {...form.register('active')} />
          حساب نشط
        </label>
      )}
      {Object.entries(form.formState.errors).map(([key, error]) => (
        <p role="alert" className="field-error" key={key}>
          {error.message}
        </p>
      ))}
    </div>
  );
}
