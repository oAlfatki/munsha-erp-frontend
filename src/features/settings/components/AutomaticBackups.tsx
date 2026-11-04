import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { requestExitBackup } from '@/features/settings/api/backups';
import { backupPolicyQuery } from "@/features/settings/public/backupPolicy-query";
import { automaticBackup } from "@/features/settings/public/backup-files";
import { backupPolicy } from "@/features/settings/public/backup-policy";
import type { AutomaticBackupsProps } from '@/features/settings/types/AutomaticBackupsProps';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function AutomaticBackups({ isEnabled: isEnabled }: AutomaticBackupsProps) {
  const identity=useQueryIdentity(); const {data:backupSettings}=useSuspenseQuery(backupPolicyQuery(identity)); const s={backupSettings};
  const mode = s ? backupPolicy(s).mode : 'off';
  useEffect(() => {
    if (!isEnabled || mode === 'off') return;
    let isRunning = false,
      lastError = '';
    const tick = async () => {
      if (isRunning || mode === 'exit') return;
      isRunning = true;
      try {
        const r = await automaticBackup('timer');
        if (r.backupId && !r.duplicate) {
          window.dispatchEvent(new Event('erp-backups-changed'));
          toast.success('اكتمل النسخ الاحتياطي التلقائي');
        }
        lastError = '';
      } catch (e) {
        const text = e instanceof Error ? e.message : 'تعذر النسخ التلقائي';
        if (text !== lastError) {
          toast.error(text);
          lastError = text;
        }
      } finally {
        isRunning = false;
      }
    };
    const exit = () => {
      if (mode === 'exit') requestExitBackup();
    };
    tick();
    const timer = window.setInterval(tick, 60000);
    window.addEventListener('pagehide', exit);
    return () => {
      clearInterval(timer);
      window.removeEventListener('pagehide', exit);
    };
  }, [isEnabled, mode, s?.backupSettings]);
  return null;
}
