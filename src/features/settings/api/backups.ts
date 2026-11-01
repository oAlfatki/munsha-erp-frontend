import { ENDPOINTS } from '@/core/config/endpoints';
import { CONFIG } from '@/core/config/env';
import { apiRequest } from '@/core/services/http/api-client';
import type { BackupRow } from '@/features/settings/types/models/BackupRow';
import type { BackupReply } from '@/features/settings/types/responses/BackupReply';

export const fetchBackups = () =>
  apiRequest<{
    rows: BackupRow[];
  }>({ url: ENDPOINTS.fetchBackups, method: 'GET' });
export const submitBackupAction = (data: { action: string; [key: string]: unknown }) =>
  apiRequest<BackupReply>({
    url: ENDPOINTS.submitBackupAction(data.action),
    method: 'POST',
    data,
  });
export function requestExitBackup() {
  const payload = { action: 'auto', event: 'exit', requestId: crypto.randomUUID() };
  const url = CONFIG.apiBaseUrl + ENDPOINTS.submitBackupAction('auto');
  navigator.sendBeacon(url, new Blob([JSON.stringify(payload)], { type: 'application/json' }));
}
