import type { BackupPolicy } from '@/features/settings/types/models/BackupPolicy';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface BackupsReadModel {
  backupSettings?: BackupPolicy;
}
