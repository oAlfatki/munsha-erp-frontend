import { ENDPOINTS } from '@/core/config/endpoints';
import { CONFIG } from '@/core/config/env';
import { apiClient } from '@/core/api/apiClient';
import type { BackupRow } from '@/features/settings/types/models/BackupRow';
import type { BackupReply } from '@/features/settings/types/responses/BackupReply';

export const fetchBackups = () =>
  apiClient.get<{
    rows: BackupRow[];
  }>(ENDPOINTS.fetchBackups);
export const submitBackupAction = (data: { action: string; [key: string]: unknown }) =>
  apiClient.post<BackupReply>(ENDPOINTS.submitBackupAction(data.action), data);
export function requestExitBackup() {
  const payload = { action: 'auto', event: 'exit', requestId: crypto.randomUUID() };
  const url = CONFIG.apiBaseUrl + ENDPOINTS.submitBackupAction('auto');
  navigator.sendBeacon(url, new Blob([JSON.stringify(payload)], { type: 'application/json' }));
}
