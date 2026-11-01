import type { FieldDef } from '@/core/types/FieldDef';
export interface DynamicFieldProps {
  field: FieldDef;
  value: string;
  onChange: (s: string) => void;
}
