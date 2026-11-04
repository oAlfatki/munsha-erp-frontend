import { formatCell } from '@/core/reporting/formatting';
import type { DeviceSettings } from '@/core/types/DeviceSettings';
import type { ReportDocument } from '@/core/types/ReportDocument';
import type { ReportIdentity } from '@/core/types/ReportIdentity';
let fontPromise: Promise<string> | undefined;
async function fontData() {
  return (fontPromise ??= fetch('/fonts/SakkalMajalla-Regular.ttf')
    .then(async (r) => {
      if (!r.ok) throw Error('تعذر تحميل خط التقرير');
      const bytes = new Uint8Array(await r.arrayBuffer());
      let value = '';
      for (let i = 0; i < bytes.length; i += 8192)
        value += String.fromCharCode(...bytes.subarray(i, i + 8192));
      return btoa(value);
    })
    .catch((e) => {
      fontPromise = undefined;
      throw e;
    }));
}
export async function buildReportPdf(
  report: ReportDocument,
  identity: ReportIdentity,
  device: DeviceSettings,
): Promise<Blob> {
  const [{ jsPDF }, { autoTable }, font] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
    fontData(),
  ]);
  const isWide = report.tables.some((t) => t.headers.length > 8),
    doc = new jsPDF({
      orientation: isWide ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
  doc.addFileToVFS('Arabic.ttf', font);
  doc.addFont('Arabic.ttf', 'Arabic', 'normal');
  doc.setFont('Arabic');
  doc.setLanguage('ar');
  doc.setProperties({ title: report.title, author: identity.name, subject: 'تقرير نظام ERP' });
  const cellTexts = new WeakMap<object, string[]>();
  const w = doc.internal.pageSize.getWidth(),
    h = doc.internal.pageSize.getHeight(),
    margin = 12,
    content = w - margin * 2;
  let y = 52;
  const header = () => {
    doc.setDrawColor(65);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, 10, content, 29, 1, 1);
    doc.setFont('Arabic');
    doc.setTextColor(25);
    doc.setFontSize(18);
    doc.text(identity.name || identity.legalName, w - margin - 4, 18, { align: 'right' });
    doc.setFontSize(11);
    const details = [
      identity.legalName !== identity.name ? identity.legalName : '',
      device.address ? identity.address : '',
      identity.phone ? 'هاتف: ' + identity.phone : '',
      identity.taxNumber ? 'الرقم الضريبي: ' + identity.taxNumber : '',
    ].filter(Boolean);
    doc.text(details.slice(0, 4), w - margin - 4, 24, { align: 'right', lineHeightFactor: 1.6 });
    if (device.logo && identity.logo) {
      try {
        doc.addImage(identity.logo, margin + 5, 14, 22, 20, undefined, 'FAST');
      } catch {
        /* Keep readable identity when a legacy logo cannot be decoded. */
      }
    }
    doc.setFontSize(15);
    doc.text(report.title, w / 2, 46, { align: 'center' });
  };
  header();
  doc.setFontSize(11);
  const meta = [
    ...(!report.metadata.some(([k]) => k === 'الفرع') ? [['الفرع', identity.branch]] : []),
    ...report.metadata,
  ].filter(([, v]) => v);
  for (let at = 0; at < meta.length; at += 2) {
    const pair = meta.slice(at, at + 2),
      width = content / 2 - 4,
      lines = pair.map(([label, value]) =>
        doc.splitTextToSize((label ? label + ': ' : '') + value, width),
      ),
      height = Math.max(...lines.map((v) => v.length)) * 4.5;
    for (let col = 0; col < lines.length; col++)
      doc.text(lines[col], w - margin - col * (content / 2), y, { align: 'right' });
    y += height + 1;
    if (y > h - 28) {
      doc.addPage();
      header();
      y = 53;
    }
  }
  for (const table of report.tables) {
    if (table.title) {
      doc.text(table.title, w - margin, y + 3, { align: 'right' });
      y += 8;
    }
    autoTable(doc, {
      startY: y + 2,
      head: [[...table.headers].reverse()],
      body: table.rows.map((r) => [...r].reverse().map(formatCell)),
      theme: 'grid',
      margin: { left: margin, right: margin, top: 52, bottom: 21 },
      styles: {
        font: 'Arabic',
        fontStyle: 'normal',
        fontSize: isWide ? 10 : 11,
        halign: 'right',
        cellPadding: 2,
        lineWidth: 0.15,
        lineColor: 80,
        fillColor: [255, 255, 255],
        textColor: 15,
        overflow: 'linebreak',
      },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      headStyles: {
        fillColor: [224, 224, 224],
        textColor: 10,
        fontStyle: 'normal',
        halign: 'center',
      },
      rowPageBreak: 'avoid',
      showHead: 'everyPage',
      willDrawCell: ({ cell }) => {
        if (!cellTexts.has(cell)) cellTexts.set(cell, [...cell.text]);
        cell.text = [];
      },
      didDrawCell: ({ cell, section }) => {
        const lines = cellTexts.get(cell) || [];
        const isCenter = section === 'head';
        doc.text(
          lines,
          isCenter ? cell.x + cell.width / 2 : cell.x + cell.width - cell.padding('right'),
          cell.y + cell.padding('top') + (doc.getFontSize() / doc.internal.scaleFactor) * 0.85,
          { align: isCenter ? 'center' : 'right', lineHeightFactor: 1.15 },
        );
      },
      didDrawPage: () => {
        header();
      },
    });
    y = (doc as typeof doc & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 6;
  }
  for (let at = 0; at < report.totals.length; at += 3) {
    if (y + 18 > h - 23) {
      doc.addPage();
      header();
      y = 53;
    }
    const pairs = report.totals.slice(at, at + 3),
      width = content / 3;
    doc.setFontSize(10);
    for (let col = 0; col < pairs.length; col++) {
      const x = w - margin - (col + 1) * width;
      doc.setDrawColor(70);
      doc.setFillColor(228, 228, 228);
      doc.rect(x, y, width, 8, 'FD');
      doc.rect(x, y + 8, width, 8);
      doc.text(doc.splitTextToSize(pairs[col][0], width - 4).slice(0, 2), x + width / 2, y + 4, {
        align: 'center',
        lineHeightFactor: 1,
      });
      doc.text(pairs[col][1], x + width / 2, y + 13, { align: 'center' });
    }
    y += 19;
  }
  const tail = [
    ...(device.words ? report.words.map((value) => ({ value, words: true })) : []),
    ...report.notes.map((value) => ({ value, words: false })),
  ];
  doc.setFontSize(11);
  for (const entry of tail) {
    const { value } = entry;
    const lines = doc.splitTextToSize(value, content);
    const height = lines.length * 4.7 + 2;
    if (y + height > h - 23) {
      doc.addPage();
      header();
      y = 53;
    }
    if (entry.words) doc.setTextColor(220, 38, 38);
    else doc.setTextColor(25);
    doc.text(lines, w - margin, y + 3, { align: 'right', lineHeightFactor: 1.5 });
    y += height;
  }
  doc.setTextColor(25);
  if (report.signatures?.length) {
    if (y + 30 > h - 23) {
      doc.addPage();
      header();
      y = 53;
    }
    const width = content / report.signatures.length;
    doc.setFontSize(11);
    report.signatures.forEach((label, index) => {
      const x = w - margin - index * width;
      doc.text(
        [label, 'الاسم: ..............................', 'التوقيع: ............................'],
        x,
        y + 7,
        { align: 'right', lineHeightFactor: 2 },
      );
    });
    y += 30;
  }
  const count = doc.getNumberOfPages(),
    at = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Aden',
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date());
  for (let page = 1; page <= count; page++) {
    doc.setPage(page);
    doc.setFontSize(10);
    doc.setDrawColor(140);
    doc.line(margin, h - 17, w - margin, h - 17);
    doc.text(`${page} / ${count}`, w / 2, h - 10, { align: 'center' });
    doc.text(at, margin, h - 10, { align: 'left' });
    doc.text(
      identity.user ? 'طبع بواسطة: ' + identity.user : 'نظام الإدارة والمحاسبة',
      w - margin,
      h - 10,
      { align: 'right' },
    );
    if (device.footer)
      doc.text(doc.splitTextToSize(device.footer, content).slice(0, 1), w / 2, h - 5, {
        align: 'center',
      });
  }
  return doc.output('blob');
}
