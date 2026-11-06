import type { ReportDocument } from '@/core/types/reports/ReportDocument';
import type { ReportTable } from '@/core/types/reports/ReportTable';

const text = (e: Element | null) => e?.textContent?.replace(/\s+/g, ' ').trim() || '';

function cell(e: Element): string {

  const copy = e.cloneNode(true) as Element;
  copy.querySelectorAll('button,svg,.no-print').forEach((b) => b.remove());
  const controls = [...e.querySelectorAll('input,select,textarea')] as (
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
  )[];
  return controls.length
    ? controls
        .map((c) =>
          c instanceof HTMLSelectElement
            ? c.selectedOptions[0]?.textContent || ''
            : c instanceof HTMLInputElement && c.type === 'checkbox'
              ? c.checked
                ? 'نعم'
                : 'لا'
              : c.value,
        )
        .join(' / ')
    : text(copy);
}

export function captureReport(title?: string): ReportDocument {

  const dialogs = [...document.querySelectorAll('[role="dialog"]')].filter(
      (e) => e.getClientRects().length,
    ),
    root = dialogs.at(-1) || document.querySelector('.workspace-content') || document.body;
  const tables: ReportTable[] = [...root.querySelectorAll('table')]
    .filter((t) => !t.closest('.no-print,.settings-section-nav'))
    .map((table) => {
      const headings = [...table.querySelectorAll('thead th')].map(text),
        keep = headings
          .map((h, i) => ({ h, i }))
          .filter(
            ({ h }) =>
              h && !/^(عرض|تعديل|حذف|طباعة|تصدير|تنزيل|استرجاع|الإجراءات|العمليات)$/.test(h),
          );
      const body = table.querySelector('tbody.print-all-rows') || table.querySelector('tbody');
      return {
        headers: keep.map((v) => v.h),
        rows: [...(body?.querySelectorAll('tr') || [])].map((row) => {
          const cs = [...row.querySelectorAll('td')];
          return keep.map((v) => cell(cs[v.i] || document.createElement('td')));
        }),
      };
    })
    .filter((t) => t.headers.length);
  if (!tables.length) {
    const detail = [...root.querySelectorAll('.report-detail dl>div')];
    if (detail.length)
      tables.push({
        headers: ['البيان', 'القيمة'],
        rows: detail.map((e) => [text(e.querySelector('dt')), text(e.querySelector('dd'))]),
      });
    const financial = [...root.querySelectorAll('.financial-row')];
    if (financial.length)
      tables.push({
        headers: ['البيان', 'المبلغ YER'],
        rows: financial.map((e) => [
          text(e.querySelector('span')),
          text(e.querySelector('strong')),
        ]),
      });
  }
  const metadata: [string, string][] = [...root.querySelectorAll('[data-report-meta]')].map((e) => [
    e.getAttribute('data-report-meta') || '',
    text(e),
  ]);
  if (!metadata.length) {
    for (const e of root.querySelectorAll(
      '.detail-meta>span,.report-context>span,.print-report-heading>p',
    ))
      metadata.push(['', text(e)]);
  }
  if (!metadata.length && !root.querySelector('.report-context'))
    for (const field of root.querySelectorAll('.form-grid .field')) {
      if (field.closest('.filter-bar')) continue;
      const label = text(field.querySelector(':scope>span'));
      const control = field.querySelector('input:not([type=file]),select,textarea') as
        | HTMLInputElement
        | HTMLSelectElement
        | null;
      if (control && label && !/بحث/.test(label)) {
        const value =
          control instanceof HTMLSelectElement
            ? control.selectedOptions[0]?.textContent || ''
            : control.value;
        if (value) metadata.push([label, value]);
      }
    }
  const totals: [string, string][] = [...root.querySelectorAll('.document-totals dl>div')].map(
    (e) => [text(e.querySelector('dt')), text(e.querySelector('dd'))],
  );
  for (const e of root.querySelectorAll('.document-stats>div'))
    totals.push([text(e.querySelector('span')), text(e.querySelector('strong'))]);
  return {
    title: title || text(root.querySelector('h1')) || text(root.querySelector('h2')) || 'تقرير',
    metadata,
    tables,
    totals,
    words: [...root.querySelectorAll('.amount-words strong')].map(text),
    notes: [...root.querySelectorAll('[data-report-note]')].map(text),
  };
}
