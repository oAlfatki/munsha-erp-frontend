export type FieldDef = {
  key: string;
  label: string;
  type?: string;
  options?: [string, string][];
  required?: boolean;
  hint?: string;
  value?: string;
};
