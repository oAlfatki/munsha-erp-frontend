import { errorMessage } from '@/core/api/error-message';
import { useAuth } from '@/core/auth/AuthProvider';
import { ROUTES } from '@/core/config/navigation-paths';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Button } from '@/shared/ui/primitives/button';
import { LogOut, UserRound } from 'lucide-react';
import { useState } from 'react';

export function SessionMenu({ editing: isEditing }: { editing: boolean }) {

  const auth = useAuth(),
    navigate = useNavigate();
  const [isOpen, setOpen] = useState(false),
    [isLeaving, setLeaving] = useState(false),
    [error, setError] = useState('');
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
          <strong>{auth.user?.displayName}</strong>
          <p>حساب نظام المنشأة</p>
        </div>
        {isEditing && <p role="alert">احفظ المستند أو تراجع عنه قبل تسجيل الخروج.</p>}
        {error && <p role="alert">{error}</p>}
        <div className="dialog-actions">
          <Button
            variant="outline"
            disabled={isEditing || isLeaving}
            onClick={() => {
              navigate(ROUTES.USERS_PASSWORD);
              setOpen(false);
            }}
          >
            تغيير كلمة المرور
          </Button>
          <Button
            variant="outline"
            disabled={isEditing || isLeaving}
            onClick={() => {
              navigate(ROUTES.USERS_SESSIONS);
              setOpen(false);
            }}
          >
            جلساتي
          </Button>
          <Button
            disabled={isEditing || isLeaving}
            onClick={async () => {
              if (isLeaving) return;
              setLeaving(true);
              setError('');
              try {
                await auth.logout();
              } catch (e) {
                setError(errorMessage(e));
              } finally {
                setLeaving(false);
              }
            }}
          >
            <LogOut size={16} />
            {isLeaving ? 'جارٍ تسجيل الخروج…' : 'تسجيل الخروج'}
          </Button>
        </div>
      </Modal>
    </>
  );
}
