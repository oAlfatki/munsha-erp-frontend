import type { FieldDef } from '@/core/types/forms/FieldDef';
export interface MasterFormDefinition {
  title: string;
  note?: string;
  collection: string;
  fields?: FieldDef[];
  initiallyOpen?: boolean;
  showCashListLink?: boolean;
}
