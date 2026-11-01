import { Modal } from '@/shared/ui/dialogs/Modal';
import { Button } from '@/shared/ui/primitives/button';
import { useApplication } from '@/app/providers/ApplicationProvider';
import { useCompanyData } from '@/app/providers/CompanyProvider';
import { authRequest } from '@/features/auth/api/auth-client';
import type { SessionProps } from '@/features/auth/types/SessionProps';
import { automaticBackup } from '@/features/settings/services/backup-files';
import { backupPolicy } from '@/features/settings/services/models/backup-policy';
import { LogOut, ShieldCheck, UserRound } from 'lucide-react';
import { useState } from 'react';

export function SessionMenu({
  user,
  signOutHref,
  editing: isEditing,
}: {
  editing: boolean;
} & SessionProps) {
  const [isOpen, setOpen] = useState(false),
    [isLeaving, setLeaving] = useState(false),
    [error, setError] = useState('');
  const { state: s } = useCompanyData();
  const { navigate } = useApplication();
  async function handleLogout() {
    if (isEditing) return;
    setLeaving(true);
    setError('');
    try {
      if (s && user?.role === 'admin' && backupPolicy(s).mode === 'exit')
        await automaticBackup('exit');
      await authRequest({ action: 'logout' });
      if (user?.kind === 'owner') window.top!.location.href = signOutHref;
      else window.location.href = '/login';
    } catch (e) {
      setError((e as Error).message);
      setLeaving(false);
    }
  }
  return (
    <>
      <Button
        aria-label="الحساب وتسجيل الخروج"
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <UserRound size={18} />
      </Button>
      <Modal isOpen={isOpen} title="الحساب والجلسة" onClose={() => setOpen(false)}>
        <div className="session-card">
          <ShieldCheck size={24} />
          <div>
            <strong>{user?.displayName}</strong>
            <p>
              {user?.kind === 'owner'
                ? 'مالك الموقع — دخول ChatGPT'
                : user?.role === 'admin'
                  ? 'مسؤول النظام'
                  : user?.role === 'staff'
                    ? 'مستخدم عمليات'
                    : 'مشاهدة فقط'}
            </p>
          </div>
        </div>
        {isEditing && (
          <p role="alert" className="field-error">
            احفظ المستند أو تراجع عنه قبل تسجيل الخروج.
          </p>
        )}
        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
        <div className="dialog-actions">
          {
            <>
              <Button
                variant="outline"
                disabled={isEditing}
                onClick={() => {
                  navigate('/users/password');
                  setOpen(false);
                }}
              >
                تغيير كلمة المرور
              </Button>
              <Button
                variant="outline"
                disabled={isEditing}
                onClick={() => {
                  navigate('/users/sessions');
                  setOpen(false);
                }}
              >
                الجلسات النشطة
              </Button>
            </>
          }
          <Button disabled={isEditing || isLeaving} onClick={handleLogout}>
            <LogOut size={16} />
            {isLeaving ? 'جارٍ تسجيل الخروج…' : 'تسجيل الخروج'}
          </Button>
        </div>
      </Modal>
    </>
  );
}
