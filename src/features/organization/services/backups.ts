import { apiClient } from '@/core/api/apiClient';
import { CONFIG } from '@/core/config/env';
import { ENDPOINTS } from '@/features/organization/api/endpoints';
import type { BackupRow } from '@/features/organization/types/models/BackupRow';
import type { AutomaticBackupRequest } from '@/features/organization/types/requests/AutomaticBackupRequest';
import type { BackupRequest } from '@/features/organization/types/requests/BackupRequest';
import type { BackupReply } from '@/features/organization/types/responses/BackupReply';

export const fetchBackups = () =>
  apiClient.get<{
    rows: BackupRow[];
  }>(ENDPOINTS.fetchBackups);

export const backupsApi = {
  create: (input: BackupRequest) =>
    apiClient.post<BackupReply>(ENDPOINTS.submitBackupAction('create'), {
      ...input,
      action: 'create',
    }),

  restore: (input: BackupRequest) =>
    apiClient.post<BackupReply>(ENDPOINTS.submitBackupAction('restore'), {
      ...input,
      action: 'restore',
    }),

  download: (input: BackupRequest) =>
    apiClient.post<BackupReply>(ENDPOINTS.submitBackupAction('download'), {
      ...input,
      action: 'download',
    }),

  automatic: (input: AutomaticBackupRequest) =>
    apiClient.post<BackupReply>(ENDPOINTS.submitBackupAction('auto'), { ...input, action: 'auto' }),
};

export function requestExitBackup() {

  const payload = { action: 'auto', event: 'exit', requestId: crypto.randomUUID() };
  const url = CONFIG.apiBaseUrl + ENDPOINTS.submitBackupAction('auto');
  navigator.sendBeacon(url, new Blob([JSON.stringify(payload)], { type: 'application/json' }));
}
