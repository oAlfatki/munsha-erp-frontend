import type { ReturnInvoiceActionsProps } from '@/features/trade/types/props/ReturnInvoiceActionsProps';
import { exportDocument, printReport } from '@/shared/services/report-actions';
import { Button } from '@/shared/ui/primitives/button';
import { Download, Printer, Save, Undo2 } from 'lucide-react';

export function ReturnInvoiceActions({
  report,
  isSaveDisabled,
  isReportDisabled,
  onSave,
  onReset,
}: ReturnInvoiceActionsProps) {

  return (
    <div className="flex flex-wrap gap-2">
      <Button disabled={isSaveDisabled} onClick={onSave}>
        <Save size={16} />
        حفظ المرتجع
      </Button>
      <Button
        variant="outline"
        disabled={isReportDisabled}
        onClick={() => report && printReport(report)}
      >
        <Printer size={16} />
        طباعة
      </Button>
      <Button
        variant="outline"
        disabled={isReportDisabled}
        onClick={() => report && exportDocument(report)}
      >
        <Download size={16} />
        تصدير
      </Button>
      <Button variant="ghost" onClick={onReset}>
        <Undo2 size={16} />
        تراجع
      </Button>
    </div>
  );
}
