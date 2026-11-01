import type { backupPolicySchema } from '@/features/settings/validation/backup-policy-schema';
import type { z } from 'zod';
export type BackupPolicy = z.infer<typeof backupPolicySchema>;
