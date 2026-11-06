import type { ReportDocument } from '@/core/types/reports/ReportDocument';

export interface ReturnInvoiceActionsProps {
  report: ReportDocument | undefined;
  isSaveDisabled: boolean;
  isReportDisabled: boolean;
  onSave: () => void;
  onReset: () => void;
}
