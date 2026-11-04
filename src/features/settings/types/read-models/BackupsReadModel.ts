import type { BackupPolicy } from '@/features/organization/public/types/models/BackupPolicy';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface BackupsReadModel {
  backupSettings?: BackupPolicy;
}
