import type { backupStateSchema } from '@/features/organization/public/backup';
import type { z } from 'zod';
/** Full archive transport payload, isolated from all live page read models. */
export type BackupArchive = z.output<typeof backupStateSchema>;
