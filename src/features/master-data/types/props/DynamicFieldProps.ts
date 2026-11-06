import type { FieldDef } from '@/shared/types/forms/FieldDef';

export interface DynamicFieldProps {
  field: FieldDef;
  value: string;
  onChange: (s: string) => void;
}
