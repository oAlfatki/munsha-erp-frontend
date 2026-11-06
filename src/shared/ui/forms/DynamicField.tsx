import type { DynamicFieldProps } from '@/core/types/props/DynamicFieldProps';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Input } from '@/shared/ui/primitives/input';

export function DynamicField({
  field,
  value,
  onChange,
  options = field.options,
}: DynamicFieldProps) {
  return (
    <Field label={field.label + (field.required ? ' *' : '')}>
      {options ? (
        <Select value={value} required={field.required} onChange={(e) => onChange(e.target.value)}>
          <option value="">اختر…</option>
          {options.map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          value={value}
          type={field.type || 'text'}
          min={field.type === 'number' ? 0 : undefined}
          step={field.type === 'number' ? 'any' : undefined}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </Field>
  );
}
