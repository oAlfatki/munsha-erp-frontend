import { printReport } from '@/core/reporting/service';
import type { ReportActionsProps } from '@/core/types/ReportActionsProps';
import { Button } from '@/shared/ui/primitives/button';
import { Download,Printer,Search } from 'lucide-react';

export function ReportActions({ onExport, onView }: ReportActionsProps) {
  return (
    <div className="flex gap-2 no-print">
      {onView && (
        <Button variant="outline" onClick={onView}>
          <Search />
          عرض
        </Button>
      )}
      <Button variant="outline" onClick={() => printReport()}>
        <Printer />
        طباعة
      </Button>
      <Button variant="outline" onClick={onExport}>
        <Download />
        تصدير
      </Button>
    </div>
  );
}
