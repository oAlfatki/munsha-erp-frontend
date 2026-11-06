import type { FieldDef } from '@/shared/types/forms/FieldDef';

export interface MasterFormDefinition {
  title: string;
  note?: string;
  collection: string;
  fields?: FieldDef[];
  initiallyOpen?: boolean;
  showCashListLink?: boolean;
}
