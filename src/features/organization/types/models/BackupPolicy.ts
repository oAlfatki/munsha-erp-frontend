import type { backupPolicySchema } from '@/features/organization/validations/backup-policy-schema';
import type { z } from 'zod';
export type BackupPolicy = z.infer<typeof backupPolicySchema>;
