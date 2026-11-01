import type {BackupPolicyContext} from '@/features/settings/types/read-models/BackupPolicyContext';
import type { BackupPolicy } from '@/features/settings/types/models/BackupPolicy';

// Frontend read models and display helpers. Authoritative mutations live in server/core.
import type { ErpReadModel } from '@/core/types/ErpReadModel';
export const DEFAULT_BACKUP_POLICY: BackupPolicy = {
  mode: 'off',
  hours: 4,
  time: '20:00',
  folder: 'نسخ المنشأة',
  retention: 20,
};
export function backupPolicy(workspace: BackupPolicyContext): BackupPolicy {
  return { ...DEFAULT_BACKUP_POLICY, ...workspace.backupSettings };
}
export function backupSlot(p: BackupPolicy, now: Date, event: 'timer' | 'exit') {
  if (p.mode === 'off' || (p.mode === 'exit') !== (event === 'exit')) return null;
  const ms = now.getTime(),
    local = new Date(ms + 3 * 3600000),
    day = local.toISOString().slice(0, 10);
  if (p.mode === 'daily')
    return local.toISOString().slice(11, 16) >= p.time ? 'daily-' + day : null;
  return (
    (p.mode === 'exit' ? 'exit-' : 'interval-') +
    Math.floor(ms / ((p.mode === 'exit' ? 5 / 60 : p.hours) * 3600000))
  );
}
