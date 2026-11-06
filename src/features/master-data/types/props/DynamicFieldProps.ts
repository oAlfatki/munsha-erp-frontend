import type { FieldDef } from '@/core/types/forms/FieldDef';
export interface DynamicFieldProps {
  field: FieldDef;
  value: string;
  onChange: (s: string) => void;
}
