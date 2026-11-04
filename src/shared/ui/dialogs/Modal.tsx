import type { ModalProps } from '@/core/types/ModalProps';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/primitives/dialog';

export function Modal({
  isOpen: isOpen,
  title,
  description,
  onClose: close,
  children,
  isWide: isWide = false,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(isO) => !isO && close()}>
      <DialogContent dir="rtl" className={'erp-dialog ' + (isWide ? 'wide' : '')}>
        <DialogHeader className="text-right">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description || 'أدخل البيانات ثم احفظ. الحقول المعلّمة بنجمة مطلوبة.'}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
