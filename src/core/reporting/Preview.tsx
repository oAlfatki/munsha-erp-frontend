import { escapeHtml, formatCell, reportIdentity } from '@/core/reporting/formatting';
import { exportDocument } from '@/core/reporting/service';
import { readDeviceSettings } from '@/core/services/device-settings';
import type { DeviceSettings } from '@/core/types/api/DeviceSettings';
import type { ReportIdentity } from '@/core/types/auth/ReportIdentity';
import type { ReportDocument } from '@/core/types/reports/ReportDocument';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Button } from '@/shared/ui/primitives/button';
import { Download, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
export function reportHtml(r: ReportDocument, i: ReportIdentity, d: DeviceSettings) {
  const esc = escapeHtml;
  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${esc(r.title)}</title><style>@font-face{font-family:'Sakkal Majalla';src:url('/fonts/SakkalMajalla-Regular.ttf') format('truetype');font-weight:400;font-display:block}@font-face{font-family:'Sakkal Majalla';src:url('/fonts/SakkalMajalla-Bold.ttf') format('truetype');font-weight:600 900;font-display:block}@page{size:A4 ${r.tables.some((t) => t.headers.length > 8) ? 'landscape' : 'portrait'};margin:12mm}body{font-family:"Sakkal Majalla",Arabic,Arial;font-size:14px;color:#111;margin:0}.masthead{border:1px solid #222;border-radius:3px;padding:12px;display:flex;justify-content:space-between;align-items:center;gap:20px}.masthead h2{margin:0 0 5px;font-size:18px}.masthead p{margin:3px 0}.masthead img{width:80px;max-height:75px;object-fit:contain}h1{font-size:16px;text-align:center;border:1px solid #333;border-radius:4px;padding:6px 22px;width:fit-content;margin:16px auto}.meta{display:flex;gap:15px;flex-wrap:wrap;margin:10px 0}.meta span{min-width:25%}table{width:100%;border-collapse:collapse;margin:12px 0;table-layout:auto}thead{display:table-header-group}th,td{border:1px solid #333;padding:5px 6px;text-align:right;vertical-align:top;overflow-wrap:anywhere}th{background:#dedede;color:#111;text-align:center;font-weight:600}tbody tr{background:#fff}tr{break-inside:avoid}tfoot{display:table-row-group}.totals{margin:15px 0;display:grid;grid-template-columns:repeat(3,1fr);gap:5px;break-inside:avoid}.totals div{border:1px solid #333;text-align:center}.totals span{display:block;background:#e4e4e4;padding:5px}.totals strong{display:block;padding:5px}.words{margin:8px 0;text-align:center;color:#dc2626}.signatures{display:flex;justify-content:space-between;gap:40px;margin:30px 0;break-inside:avoid}.signatures>div{width:42%;line-height:2.5}.report-footer{display:flex;justify-content:space-between;border-top:1px solid #777;margin-top:20px;padding-top:8px;font-size:9px}@media print{body{print-color-adjust:exact;-webkit-print-color-adjust:exact}}${d.paper === 'thermal' ? 'body{max-width:80mm;margin:auto;font-size:12px}.masthead{padding:5px}.masthead h2{font-size:12px}th,td{padding:3px}.totals{grid-template-columns:1fr 1fr}' : ''}</style></head><body><header class="masthead"><div><h2>${esc(i.name || i.legalName)}</h2>${i.name !== i.legalName ? '<p>' + esc(i.legalName) + '</p>' : ''}${d.address ? '<p>' + esc(i.address) + '</p>' : ''}<p>${esc([i.phone, i.email].filter(Boolean).join(' · '))}</p>${i.taxNumber ? '<p>الرقم الضريبي: ' + esc(i.taxNumber) + '</p>' : ''}${i.registrationNumber ? '<p>السجل التجاري: ' + esc(i.registrationNumber) + '</p>' : ''}</div>${d.logo && /^data:image\/(png|jpeg|webp);base64,/.test(i.logo) ? '<img alt="شعار المنشأة" src="' + esc(i.logo) + '">' : ''}</header><h1>${esc(r.title)}</h1><div class="meta">${!r.metadata.some(([k]) => k === 'الفرع') ? '<span>الفرع: ' + esc(i.branch) + '</span>' : ''}${r.metadata.map(([k, v]) => '<span>' + (k ? esc(k) + ': ' : '') + esc(v) + '</span>').join('')}</div>${r.tables.map((t) => (t.title ? '<h3>' + esc(t.title) + '</h3>' : '') + '<table><thead><tr>' + t.headers.map((h) => '<th>' + esc(h) + '</th>').join('') + '</tr></thead><tbody>' + t.rows.map((row) => '<tr>' + row.map((v) => '<td>' + esc(formatCell(v)) + '</td>').join('') + '</tr>').join('') + '</tbody></table>').join('')}<div class="totals">${r.totals.map(([k, v]) => '<div><span>' + esc(k) + '</span><strong>' + esc(v) + '</strong></div>').join('')}</div>${d.words ? r.words.map((v) => '<p class="words">' + esc(v) + '</p>').join('') : ''}${r.notes.map((v) => '<p>' + esc(v) + '</p>').join('')}${r.signatures?.length ? '<div class="signatures">' + r.signatures.map((v) => '<div><strong>' + esc(v) + '</strong><p>الاسم: ................................</p><p>التوقيع: ..............................</p></div>').join('') + '</div>' : ''}<footer class="report-footer"><span>${esc(new Intl.DateTimeFormat('ar-YE', { timeZone: 'Asia/Aden', dateStyle: 'short', timeStyle: 'short' }).format(new Date()))}</span><span>${esc(i.user)}</span></footer><p class="report-message">${esc(d.footer)}</p></body></html>`;
}
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
