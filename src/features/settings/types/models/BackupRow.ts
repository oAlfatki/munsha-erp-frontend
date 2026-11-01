export interface BackupRow {
  id: string;
  name: string;
  year: number;
  revision: number;
  updated_at: string;
  folder?: string;
  kind?: string;
}
