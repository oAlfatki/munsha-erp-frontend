import { backupsApi } from '@/features/organization/services/backups';
import type { BackupFolder } from '@/features/organization/types/models/BackupFolder';

const store = async (
  mode: IDBTransactionMode,
  handle?: BackupFolder | null,
): Promise<BackupFolder | null> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open('erp-backup-folder', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('settings');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result,
        tx = db.transaction('settings', mode),
        s = tx.objectStore('settings'),
        r =
          mode === 'readwrite'
            ? handle
              ? s.put(handle, 'folder')
              : s.delete('folder')
            : s.get('folder');
      let value: BackupFolder | null = null;
      r.onsuccess = () => {
        value = mode === 'readonly' ? r.result || null : handle || null;
      };
      tx.oncomplete = () => {
        db.close();
        resolve(value);
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    };
  });

export const readBackupFolder = () => store('readonly');

export async function chooseBackupFolder() {

  const picker = (
    window as unknown as {
      showDirectoryPicker?: (o: { mode: 'readwrite' }) => Promise<BackupFolder>;
    }
  ).showDirectoryPicker;
  if (!picker)
    throw Error(
      'اختيار مجلد مباشر غير مدعوم هنا؛ سيُستخدم التنزيل المعتاد واختيار مكانه من المتصفح.',
    );
  const h = await picker({ mode: 'readwrite' });
  await store('readwrite', h);
  return h;
}

export const clearBackupFolder = () => store('readwrite', null);

export async function saveBackupFile(data: unknown, name: string, isAutomatic = false) {

  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  let folder: BackupFolder | null = null;
  try {
    folder = await readBackupFolder();
  } catch {}
  if (folder) {
    if ((await folder.queryPermission({ mode: 'readwrite' })) !== 'granted')
      throw Error('أعد اختيار مجلد النسخ لمنح إذن الكتابة. النسخة السحابية محفوظة.');
    const file = await folder.getFileHandle(name, { create: true }),
      writer = await file.createWritable();
    await writer.write(blob);
    await writer.close();
    return folder.name;
  }
  if (isAutomatic) return null;
  const url = URL.createObjectURL(blob),
    a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'التنزيلات';
}

export const backupFileName = (revision: number, stamp = new Date().toISOString()) =>
  'ERP-' + stamp.replace(/[:.]/g, '-') + '-r' + revision + '.json';

export async function automaticBackup(event: 'timer' | 'exit') {

  const d = await backupsApi.automatic({ event, requestId: crypto.randomUUID() });
  if (d.backupId && !d.duplicate)
    await saveBackupFile(
      {
        format: 'munsha-erp',
        version: 2,
        revision: d.revision,
        createdAt: d.createdAt,
        state: d.state,
      },
      backupFileName(d.revision, d.createdAt),
      true,
    );
  return d;
}
