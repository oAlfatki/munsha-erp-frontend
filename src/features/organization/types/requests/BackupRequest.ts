export interface BackupRequest {
  revision: number;
  requestId: string;
  backupId?: string;
  confirm?: string;
  state?: unknown;
}
