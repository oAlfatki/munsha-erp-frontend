export interface BackupReply {
  error?: string;
  backupId?: string;
  duplicate?: boolean;
  skipped?: boolean;
  revision: number;
  createdAt: string;
  state: unknown;
}
