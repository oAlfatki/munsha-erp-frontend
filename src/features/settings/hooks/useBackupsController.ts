import { ApiError } from '@/core/api/apiError';
import { newId } from '@/core/utils/id';
import type { BackupArchive, BackupPolicy, Row, Tab } from '@/features/organization/public';
import {
  backupFileName,
  backupPolicy,
  backupsApi,
  backupSettingsSchema,
  readBackupFolder,
  saveBackupFile,
} from '@/features/organization/public';
import { useBackupSettings } from '@/features/settings/hooks/useBackupSettings';
import { useBackupsQuery as useBackupsListQuery } from '@/features/settings/hooks/useBackupsQuery';
import { useBackupsQuery } from '@/features/settings/queries/useBackupsQuery';
import type { BackupsProps } from '@/features/settings/types/props/BackupsProps';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export function useBackupsController({ initialTab = 'backup' }: BackupsProps) {

  const { state, revision, refresh, navigate } = useBackupsQuery();
  const backupSettingsMutationRequest = useBackupSettings(),
    backupSettingsForm = useValidatedForm(
      backupSettingsSchema,
      backupSettingsMutationRequest.execute,
    ),
    backupSettingsMutation = {
      ...backupSettingsMutationRequest,
      execute: backupSettingsForm.submit,
    };
  const [tab, setTab] = useState<Tab>(initialTab),
    [policy, setPolicy] = useState<BackupPolicy>(backupPolicy(state!)),
    [folder, setFolder] = useState(''),
    [status, setStatus] = useState('جاهز'),
    [isBusy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [fileState, setFileState] = useState<BackupArchive | null>(null),
    [selected, setSelected] = useState<Row | null>(null),
    [phrase, setPhrase] = useState('');
  const pending = useRef<{
    signature: string;
    id: string;
  } | null>(null);
  const backups = useBackupsListQuery();
  const rows = backups.data?.rows || [];

  const handleLoad = async () => {

    const result = await backups.refetch();
    if (result.error) setError(result.error.message);
    else setError('');
  };

  useEffect(() => {
    readBackupFolder()
      .then((h) => setFolder(h?.name || ''))
      .catch(() => {});
    window.addEventListener('erp-backups-changed', handleLoad);
    return () => window.removeEventListener('erp-backups-changed', handleLoad);
  }, []);
  if (!state) return null;

  const change = (value: Tab) => {

    setTab(value);
    navigate('/settings/' + (value === 'settings' ? 'backup-policy' : value));
  };

  const request = async (action: 'create' | 'restore' | 'download', row?: Row) => {

    if (isBusy) return;
    setBusy(true);
    setStatus(
      action === 'restore'
        ? 'جارٍ فحص واستعادة النسخة…'
        : action === 'create'
          ? 'جارٍ إنشاء النسخة…'
          : 'جارٍ حفظ الملف…',
    );
    try {
      const body = {
        action,
        revision,
        backupId: row?.id,
        ...(action === 'restore' ? { confirm: phrase, ...(!row ? { state: fileState } : {}) } : {}),
      };
      const signature = JSON.stringify(body);
      if (pending.current?.signature !== signature) pending.current = { signature, id: newId() };
      const d = await backupsApi[action]({ ...body, requestId: pending.current.id });
      pending.current = null;
      if (action === 'download') {
        const destination = await saveBackupFile(d, backupFileName(d.revision, d.createdAt));
        setStatus('حُفظ ملف النسخة في ' + destination);
      } else {
        await refresh();
        await handleLoad();
        setSelected(null);
        setFileState(null);
        setPhrase('');
        setStatus(
          action === 'restore'
            ? 'تمت الاستعادة بنجاح مع حفظ نسخة قبلها'
            : 'اكتمل إنشاء النسخة السحابية',
        );
        toast.success(
          action === 'restore' ? 'استُرجعت النسخة وحُفظت نقطة رجوع قبلها' : 'حُفظت النسخة السحابية',
        );
        if (action === 'create' && folder) {
          await saveBackupFile(
            {
              format: 'munsha-erp',
              version: 2,
              createdAt: d.createdAt,
              revision: d.revision,
              state: d.state,
            },
            backupFileName(d.revision, d.createdAt),
          );
          setStatus('اكتمل النسخ السحابي وحُفظ الملف في ' + folder);
        }
      }
      setError('');
    } catch (e) {
      if (e instanceof ApiError && e.status === 409) {
        pending.current = null;
        await refresh();
      }
      const message =
        e instanceof Error ? e.message : 'تعذر تأكيد العملية، أعد المحاولة بنفس البيانات';
      setError(message);
      setStatus(message);
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  return {
    s: state,
    revision,
    refresh,
    backupSettingsMutation,
    tab,
    policy,
    setPolicy,
    folder,
    setFolder,
    status,
    setStatus,
    isBusy,
    error,
    setError,
    fileState,
    setFileState,
    selected,
    setSelected,
    phrase,
    setPhrase,
    rows,
    handleLoad,
    change,
    request,
  };
}
