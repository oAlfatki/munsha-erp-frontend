import { afterEach, it, expect, vi } from 'vitest';
import { axiosInstance } from '@/core/api/apiClient';
import { backupsApi } from "@/features/organization/services/backups";
const original = axiosInstance.defaults.adapter;
afterEach(() => {
  axiosInstance.defaults.adapter = original;
  vi.unstubAllGlobals();
});
it('chooses each backup endpoint lazily and preserves existing payload tags and metadata', async () => {
  vi.stubGlobal('document', { documentElement: { lang: 'ar' } });
  const calls: unknown[] = [];
  axiosInstance.defaults.adapter = async (config) => {
    calls.push([config.method, config.url, JSON.parse(config.data)]);
    return { data: { revision: 4 }, status: 200, statusText: 'OK', headers: {}, config };
  };
  await backupsApi.create({ revision: 3, requestId: 'create-id' });
  await backupsApi.download({ revision: 3, requestId: 'download-id', backupId: 'backup-1' });
  await backupsApi.restore({
    revision: 3,
    requestId: 'restore-id',
    confirm: 'RESTORE',
    state: { archive: true },
  });
  await backupsApi.automatic({ event: 'timer', requestId: 'auto-id' });
  expect(calls).toEqual([
    ['post', '/backups/create', { revision: 3, requestId: 'create-id', action: 'create' }],
    [
      'post',
      '/backups/download',
      { revision: 3, requestId: 'download-id', backupId: 'backup-1', action: 'download' },
    ],
    [
      'post',
      '/backups/restore',
      {
        revision: 3,
        requestId: 'restore-id',
        confirm: 'RESTORE',
        state: { archive: true },
        action: 'restore',
      },
    ],
    ['post', '/backups/auto', { event: 'timer', requestId: 'auto-id', action: 'auto' }],
  ]);
});
