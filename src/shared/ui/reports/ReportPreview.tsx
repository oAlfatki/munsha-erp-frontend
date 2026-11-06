import { reportIdentity } from '@/core/reporting/formatting';
import { reportHtml } from '@/core/reporting/html';
import { readDeviceSettings } from '@/core/services/device-settings';
import type { DeviceSettings } from '@/core/types/preferences/DeviceSettings';
import type { ReportDocument } from '@/core/types/reports/ReportDocument';
import type { ReportIdentity } from '@/core/types/reports/ReportIdentity';
import { exportDocument } from '@/shared/services/report-actions';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Button } from '@/shared/ui/primitives/button';
import { Download, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function ReportPreview() {

  const [status, setStatus] = useState<{
    title: string;
    state: string;
    url?: string;
    filename?: string;
    message?: string;
  } | null>(null);
  const [confirmation, setConfirmation] = useState<{
    title: string;
    resolve: (isV: boolean) => void;
  } | null>(null);
  const [data, setData] = useState<{
    report: ReportDocument;
    identity: ReportIdentity;
    device: DeviceSettings;
  } | null>(null);
  useEffect(() => {
    const handle = (e: Event) =>
      setData({
        report: (e as CustomEvent<ReportDocument>).detail,
        identity: { ...reportIdentity },
        device: readDeviceSettings(),
      });

    const statusHandler = (e: Event) => setStatus((e as CustomEvent).detail);

    window.addEventListener('erp-export-status', statusHandler);

    const confirm = (e: Event) => setConfirmation((e as CustomEvent).detail);

    window.addEventListener('erp-export-confirm', confirm);
    window.addEventListener('erp-report-preview', handle);
    return () => {
      window.removeEventListener('erp-export-status', statusHandler);
      window.removeEventListener('erp-export-confirm', confirm);
      window.removeEventListener('erp-report-preview', handle);
    };
  }, []);
  if (!data && !confirmation && !status) return null;
  const html = data ? reportHtml(data.report, data.identity, data.device) : '';

  const answer = (isV: boolean) => {

    confirmation?.resolve(isV);
    setConfirmation(null);
  };

  const handlePrint = async () => {

    const iframe = document.getElementById('erp-print-frame') as HTMLIFrameElement | null;
    const win = iframe?.contentWindow;
    if (!win) {
      toast.error('المعاينة غير جاهزة');
      return;
    }
    await win.document.fonts.ready;
    win.focus();
    win.print();
  };

  return (
    <>
      {status && (
        <Modal
          isOpen
          title={
            status.state === 'ready'
              ? 'ملف PDF جاهز'
              : status.state === 'error'
                ? 'تعذر تصدير PDF'
                : 'جارٍ تجهيز PDF'
          }
          description={status.title}
          onClose={() => setStatus(null)}
        >
          {status.state === 'ready' ? (
            <>
              <p>تم تجهيز المستند. إذا لم يبدأ التنزيل تلقائيًا، اضغط الزر التالي.</p>
              <Button asChild>
                <a href={status.url} download={status.filename}>
                  تنزيل ملف PDF
                </a>
              </Button>
            </>
          ) : status.state === 'error' ? (
            <p role="alert">{status.message}</p>
          ) : (
            <p>جارٍ بناء المستند وإضافة الخط العربي…</p>
          )}
        </Modal>
      )}
      {confirmation && (
        <Modal
          isOpen
          title="تأكيد تصدير PDF"
          description="سيتم تنزيل جميع الصفوف المطابقة للعرض في ملف PDF واحد، مع الإجماليات والتفقيط المتاحين."
          onClose={() => answer(false)}
        >
          <p>{confirmation.title}</p>
          <div className="dialog-actions">
            <Button onClick={() => answer(true)}>تأكيد التصدير</Button>
            <Button variant="outline" onClick={() => answer(false)}>
              إلغاء
            </Button>
          </div>
        </Modal>
      )}
      {data && (
        <Modal
          isOpen={!confirmation && !status}
          isWide
          title={'معاينة الطباعة — ' + data.report.title}
          description="القالب الموحد للمستندات والتقارير. تتضمن المعاينة جميع الصفوف المطابقة، ويكون ملف PDF مرقم الصفحات."
          onClose={() => setData(null)}
        >
          <div className="report-preview-actions">
            <Button onClick={handlePrint}>
              <Printer size={16} />
              طباعة المستند
            </Button>
            <Button variant="outline" onClick={() => exportDocument(data.report)}>
              <Download size={16} />
              تصدير PDF
            </Button>
            <Button variant="ghost" onClick={() => setData(null)}>
              إغلاق المعاينة
            </Button>
          </div>
          <iframe
            sandbox="allow-same-origin allow-modals"
            id="erp-print-frame"
            title="معاينة المستند الموحد"
            srcDoc={html}
            className="unified-report-frame"
          />
        </Modal>
      )}
    </>
  );
}
