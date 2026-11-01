import { captureReport } from '@/core/reporting/capture';
import { readDeviceSettings } from '@/core/services/device-settings';
import type { ReportCell } from '@/core/types/ReportCell';
import type { ReportDocument } from '@/core/types/ReportDocument';
import { reportIdentity, safeFilename } from '@/core/reporting/formatting';
import { toast } from 'sonner';
let isExporting = false;
export async function exportDocument(report: ReportDocument) {
  if (isExporting) return;
  isExporting = true;
  const isAccepted = await new Promise<boolean>((resolve) =>
    window.dispatchEvent(
      new CustomEvent('erp-export-confirm', { detail: { title: report.title, resolve } }),
    ),
  );
  if (!isAccepted) {
    isExporting = false;
    return;
  }
  window.dispatchEvent(
    new CustomEvent('erp-export-status', { detail: { title: report.title, state: 'loading' } }),
  );
  const id = toast.loading('جارٍ تجهيز ملف PDF…'),
    identity = { ...reportIdentity },
    device = readDeviceSettings();
  try {
    const { buildReportPdf } = await import('@/core/reporting/pdf');
    const blob = await buildReportPdf(report, identity, device),
      url = URL.createObjectURL(blob),
      a = document.createElement('a');
    a.href = url;
    a.download = safeFilename(report.title) + '.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.dispatchEvent(
      new CustomEvent('erp-export-status', {
        detail: { title: report.title, state: 'ready', url, filename: a.download },
      }),
    );
    setTimeout(() => URL.revokeObjectURL(url), 300000);
    toast.success('تم تجهيز ملف PDF للتنزيل', { id });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'خطأ غير معروف';
    window.dispatchEvent(
      new CustomEvent('erp-export-status', {
        detail: { title: report.title, state: 'error', message },
      }),
    );
    toast.error('تعذر تجهيز PDF. تحقق من الاتصال وحاول مجددًا.', { id });
  } finally {
    isExporting = false;
  }
}
export function exportPdf(
  title: string,
  headers: string[],
  rows: ReportCell[][],
  options: Partial<Omit<ReportDocument, 'title' | 'tables'>> = {},
) {
  const snapshot = captureReport(title);
  return exportDocument({ ...snapshot, tables: [{ headers, rows }], ...options });
}
export function printReport(report?: ReportDocument) {
  window.dispatchEvent(
    new CustomEvent('erp-report-preview', { detail: report || captureReport() }),
  );
}
