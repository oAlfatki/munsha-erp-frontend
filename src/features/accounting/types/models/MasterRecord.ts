export interface MasterRecord {
  id: string;
  name: string;
  active: boolean;
  [key: string]: string | number | boolean;
}
