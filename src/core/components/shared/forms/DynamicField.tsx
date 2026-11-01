import { Field } from '@/core/components/shared/forms/Field';
import { Select } from '@/core/components/shared/forms/Select';
import { Input } from '@/core/components/ui/input';
import type { DynamicFieldProps } from '@/core/types/DynamicFieldProps';

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
