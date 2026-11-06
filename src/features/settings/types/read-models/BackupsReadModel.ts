import type { BackupPolicy } from '@/features/organization/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface BackupsReadModel {
  backupSettings?: BackupPolicy;
}
