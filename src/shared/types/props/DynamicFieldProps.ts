import type { FieldDef } from '@/shared/types/forms/FieldDef';

export interface DynamicFieldProps {
  field: FieldDef;
  value: string;
  onChange: (value: string) => void;
  options?: [string, string][];
}
