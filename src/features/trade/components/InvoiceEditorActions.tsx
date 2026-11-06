import type { InvoiceEditorActionsProps } from '@/features/trade/types/props/InvoiceEditorActionsProps';
import { Button } from '@/shared/ui/primitives/button';
import { ArrowRight } from 'lucide-react';

export function InvoiceEditorActions({ onClose, onNew, isReadOnly }: InvoiceEditorActionsProps) {

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={onClose}>
        <ArrowRight />
        قائمة الفواتير
      </Button>
      {isReadOnly && (
        <Button variant="outline" onClick={onNew}>
          فاتورة جديدة
        </Button>
      )}
    </div>
  );
}
