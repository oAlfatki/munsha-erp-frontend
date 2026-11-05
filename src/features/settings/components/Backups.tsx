import { ApiError } from '@/core/api/apiError';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { newId } from '@/core/utils/id';
import type { BackupArchive, BackupPolicy, Row, Tab } from '@/features/organization/public';
import {
  backupFileName,
  backupPolicy,
  backupsApi,
  backupSettingsSchema,
  chooseBackupFolder,
  clearBackupFolder,
  readBackupFolder,
  saveBackupFile,
  validateBackupState,
} from '@/features/organization/public';
import { useBackupSettings } from '@/features/settings/hooks/useBackupSettings';
import { useBackupsQuery as useBackupsListQuery } from '@/features/settings/hooks/useBackupsQuery';
import { useBackupsQuery } from '@/features/settings/queries/useBackupsQuery';
import type { BackupsProps } from '@/features/settings/types/props/BackupsProps';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export function Backups({ initialTab = 'backup' }: BackupsProps) {
  const { state: s, revision, refresh, navigate } = useBackupsQuery();
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
    [policy, setPolicy] = useState<BackupPolicy>(backupPolicy(s!)),
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
  if (!s) return null;
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
  const grid = (isRestore: boolean) => (
    <DataTable
      headers={[
        'الوقت',
        'المنشأة',
        'السنة',
        'الإصدار',
        'النوع',
        'مجلد النسخة',
        'تنزيل',
        ...(isRestore ? ['استرجاع'] : []),
      ]}
      rows={rows.map((row) => [
        new Date(row.updated_at).toLocaleString('ar-YE', { timeZone: 'Asia/Aden' }),
        row.name,
        row.year,
        row.revision,
        row.kind === 'auto' || row.id.startsWith('backup-auto-')
          ? 'تلقائية'
          : row.kind === 'before' || row.id.startsWith('backup-before-')
            ? 'قبل استرجاع'
            : 'يدوية',
        row.folder || 'نسخ المنشأة',
        <Button
          size="sm"
          variant="outline"
          disabled={isBusy}
          onClick={() => request('download', row)}
        >
          حفظ ملف
        </Button>,
        ...(isRestore
          ? [
              <Button
                size="sm"
                variant="ghost"
                disabled={isBusy}
                onClick={() => {
                  setSelected(row);
                  setPhrase('');
                }}
              >
                استرجاع
              </Button>,
            ]
          : []),
      ])}
    />
  );
  return (
    <>
      <PageHead
        title="النسخ الاحتياطي والاستعادة"
        description="إنشاء نسخة كاملة للمنشأة وأرشيف السنوات، أو فحص نسخة واستعادتها، أو ضبط التكرار ووجهة الحفظ."
        extra={
          <Button variant="outline" onClick={handleLoad} disabled={isBusy}>
            تحديث النسخ
          </Button>
        }
      />
      <div className="module-tabs" role="tablist" aria-label="النسخ الاحتياطي">
        <button
          role="tab"
          aria-selected={tab === 'backup'}
          className={tab === 'backup' ? 'active' : ''}
          onClick={() => change('backup')}
        >
          النسخ الاحتياطي
        </button>
        <button
          role="tab"
          aria-selected={tab === 'restore'}
          className={tab === 'restore' ? 'active' : ''}
          onClick={() => change('restore')}
        >
          استرجاع نسخة احتياطية
        </button>
        <button
          role="tab"
          aria-selected={tab === 'settings'}
          className={tab === 'settings' ? 'active' : ''}
          onClick={() => change('settings')}
        >
          إعدادات النسخ الاحتياطي
        </button>
      </div>
      <div className="document-stats">
        <div>
          <span>إصدار البيانات</span>
          <strong>{revision}</strong>
        </div>
        <div>
          <span>النسخ المحفوظة</span>
          <strong>
            {rows.length} / {backupPolicy(s).retention}
          </strong>
        </div>
        <div>
          <span>الحالة</span>
          <strong role="status">{status}</strong>
        </div>
      </div>
      {tab === 'backup' && (
        <>
          <section className="panel form-panel">
            <h2>نسخ احتياطي مباشرة</h2>
            <p>نسخة كاملة بالبيانات والقيود والمخزون والمستندات وأرشيف السنوات.</p>
            <div className="dialog-actions">
              <Button disabled={isBusy} onClick={() => request('create')}>
                نسخ احتياطي الآن
              </Button>
              <Button
                variant="outline"
                disabled={isBusy}
                onClick={async () => {
                  if (!window.confirm('هل تريد إنشاء نسخة كاملة من الخادم وتنزيلها؟')) return;
                  try {
                    setStatus('جارٍ حفظ ملف النسخة…');
                    const response = await backupsApi.create({
                      revision,
                      requestId: newId(),
                    });
                    // Only the server can produce a complete backup after resource separation.
                    const fullState = validateBackupState(response.state);
                    const dest = await saveBackupFile(
                      {
                        format: 'munsha-erp',
                        version: 2,
                        createdAt: response.createdAt,
                        revision: response.revision,
                        state: fullState,
                      },
                      backupFileName(response.revision, response.createdAt),
                    );
                    await handleLoad();
                    setStatus('حُفظ الملف في ' + dest);
                  } catch (e) {
                    setError((e as Error).message);
                  }
                }}
              >
                حفظ نسخة كملف
              </Button>
            </div>
            <p>
              وجهة الملفات: {folder || 'مجلد التنزيلات أو المسار الذي يختاره المستخدم عند التنزيل'}
            </p>
          </section>
          <h2 className="section-heading">النسخ المحفوظة</h2>
          {grid(false)}
        </>
      )}
      {tab === 'restore' && (
        <>
          <section className="panel form-panel">
            <h2>اختيار النسخة واستعادتها</h2>
            <Field label="ملف النسخة الاحتياطية JSON">
              <Input
                type="file"
                accept=".json,application/json"
                onChange={async (e) => {
                  setFileState(null);
                  setError('');
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setStatus('جارٍ فحص الملف…');
                  try {
                    if (f.size > 8000000) throw Error('ملف النسخة يتجاوز 8MB');
                    const data = JSON.parse(await f.text());
                    if (data.format !== 'munsha-erp' || data.version !== 2)
                      throw Error('صيغة نسخة غير معروفة؛ اختر ملف نسخة صادرًا من هذا النظام');
                    setFileState(validateBackupState(data.state));
                    setSelected(null);
                    setPhrase('');
                    setStatus('اكتمل فحص الملف؛ راجع النسخة قبل الاستعادة');
                  } catch (e) {
                    setError(e instanceof Error ? e.message : 'تعذر فحص النسخة');
                    setStatus('فشل فحص النسخة');
                  }
                }}
              />
            </Field>
            {fileState && (
              <div className="mt-5">
                <Pill>اجتاز الملف فحص البنية وتوازن القيود والمخزون</Pill>
                <p>
                  {fileState.organization.name} · السنة {fileState.organization.year} ·{' '}
                  {fileState.entries.length} قيد
                </p>
                <Button
                  disabled={isBusy}
                  onClick={() => {
                    setSelected({
                      id: 'file',
                      name: fileState.organization.name,
                      year: fileState.organization.year,
                      revision: 0,
                      updated_at: '',
                    });
                    setPhrase('');
                  }}
                >
                  مراجعة استرجاع الملف
                </Button>
              </div>
            )}
          </section>
          <h2 className="section-heading">أو اختر نسخة سحابية محفوظة</h2>
          {grid(true)}
        </>
      )}
      {tab === 'settings' && (
        <Form
          className="panel form-panel"
          onSubmit={async (e) => {
            e.preventDefault();
            if (await backupSettingsMutation.execute(policy)) {
              await refresh();
              toast.success('حُفظت إعدادات النسخ الاحتياطي');
            }
          }}
        >
          <h2>وجهة النسخ</h2>
          <div className="form-grid">
            <Field label="اسم مجلد النسخ السحابية *">
              <Input
                required
                value={policy.folder}
                maxLength={80}
                onChange={(e) => setPolicy({ ...policy, folder: e.target.value })}
              />
            </Field>
            <Field label="عدد النسخ المحتفظ بها *">
              <Input
                required
                type="number"
                min="5"
                max="100"
                value={policy.retention}
                onChange={(e) => setPolicy({ ...policy, retention: +e.target.value })}
              />
            </Field>
          </div>
          <p>
            يُحفظ الاسم مع النسخ السحابية؛ تُحذف النسخ الأقدم عند تجاوز العدد المحدد. هذا اسم تصنيف
            داخل خدمة النسخ، وليس مسار قرص على جهازك.
          </p>
          <div className="dialog-actions">
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                try {
                  const h = await chooseBackupFolder();
                  setFolder(h.name);
                  setError('');
                  toast.success('اختير مجلد ' + h.name);
                } catch (e) {
                  if ((e as Error).name !== 'AbortError') setError((e as Error).message);
                }
              }}
            >
              اختيار مجلد على هذا الجهاز
            </Button>
            {folder && (
              <Button
                type="button"
                variant="ghost"
                onClick={async () => {
                  await clearBackupFolder();
                  setFolder('');
                }}
              >
                استخدام التنزيل المعتاد
              </Button>
            )}
          </div>
          <p>
            المجلد المحلي: <strong>{folder || 'لم يُحدد — التنزيل المعتاد'}</strong>. إذن المجلد يخص
            هذا المتصفح والجهاز. يمكن اختيار المسار من نافذة الحفظ إذا لم يدعم المتصفح اختيار
            المجلد.
          </p>
          <h2 className="section-heading">النسخ التلقائي</h2>
          <div className="form-grid">
            <Field label="نوع النسخ التلقائي">
              <Select
                value={policy.mode}
                onChange={(e) =>
                  setPolicy({ ...policy, mode: e.target.value as BackupPolicy['mode'] })
                }
              >
                <option value="off">إيقاف</option>
                <option value="exit">عند تسجيل الخروج أو إغلاق الصفحة</option>
                <option value="interval">كل عدد محدد من الساعات</option>
                <option value="daily">يوميًا في وقت محدد</option>
              </Select>
            </Field>
            {policy.mode === 'interval' && (
              <Field label="كل عدد ساعات *">
                <Input
                  required
                  type="number"
                  min="1"
                  max="168"
                  value={policy.hours}
                  onChange={(e) => setPolicy({ ...policy, hours: +e.target.value })}
                />
              </Field>
            )}
            {policy.mode === 'daily' && (
              <Field label="وقت النسخ — توقيت عدن *">
                <Input
                  required
                  type="time"
                  value={policy.time}
                  onChange={(e) => setPolicy({ ...policy, time: e.target.value })}
                />
              </Field>
            )}
          </div>
          <p className="info-note">
            ينفذ التلقائي أثناء فتح النظام بواسطة مسؤول النظام. عند تسجيل الخروج ينتظر النظام اكتمال
            النسخ؛ عند إغلاق المتصفح يرسل طلبًا بأفضل جهد وقد لا يصل إذا انقطع الاتصال. لا يعمل مؤقت
            المتصفح بعد إغلاقه. تبقى النسخة السحابية محفوظة إن تعذر حفظ الملف المحلي، ويظهر تنبيه
            بطلب إذن المجلد.
          </p>
          <Button disabled={isBusy}>حفظ إعدادات النسخ</Button>
        </Form>
      )}
      {error && (
        <div role="alert" className="error-banner">
          {error}
        </div>
      )}
      <Modal
        isOpen={!!selected}
        title="تأكيد استرجاع النسخة"
        onClose={() => setSelected(null)}
        description="تستبدل النسخة جميع بيانات المساحة بما فيها أرشيف السنوات؛ تحفظ البيانات الحالية أولًا كنقطة رجوع في العملية نفسها."
      >
        <p>
          النسخة: {selected?.name} · السنة {selected?.year}
        </p>
        <p>ستتأثر مساحة العمل لدى جميع المستخدمين.</p>
        <Field label="اكتب استرجاع للتأكيد">
          <Input value={phrase} onChange={(e) => setPhrase(e.target.value)} />
        </Field>
        <div className="dialog-actions">
          <Button
            disabled={isBusy || phrase !== 'استرجاع'}
            onClick={() =>
              request('restore', selected?.id === 'file' ? undefined : selected || undefined)
            }
          >
            تأكيد الاسترجاع
          </Button>
          <Button variant="ghost" onClick={() => setSelected(null)}>
            تراجع
          </Button>
        </div>
      </Modal>
    </>
  );
}
