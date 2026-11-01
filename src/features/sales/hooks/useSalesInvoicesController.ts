import { useErpContext } from '@/core/hooks/useErpContext';
import { exportDocument, exportPdf } from '@/core/reporting/service';
import { fiscalRange } from '@/features/accounting/services/models/fiscal-range';
import { invoiceReport } from '@/features/reports/services/models/report-documents';
import { invoiceEvents } from '@/features/trade/services/models/invoice-events';
import type { Invoice } from '@/features/trade/types/models/Invoice';
import { useEffect, useState } from 'react';
export function useSalesInvoicesController() {
  const { state: s, branchId, view, navigate, refresh, setEditingDocument } = useErpContext();
  const [searchQuery, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [documentType, setDocumentType] = useState('all');
  const [from, setFrom] = useState(fiscalRange(s!).from);
  const [to, setTo] = useState(fiscalRange(s!).to);
  const [editor, setEditor] = useState<Invoice | null | undefined>();
  const [detail, setDetail] = useState<string | null>(null);
  const [isConfirm, setConfirm] = useState(false);
  useEffect(() => {
    if (view.endsWith('/new')) setEditor(null);
    if (view.startsWith('/documents/')) setDetail(decodeURIComponent(view.split('/').at(-1)!));
  }, [view]);
  if (!s) return null;
  const label = 'المبيعات';
  const current =
    invoiceEvents(s, 'sale', branchId).find((x) => x.number === detail) ||
    s.invoices.find((invoice) => invoice.id === detail);
  const browse = s.invoices
    .filter((invoice) => invoice.kind === 'sale' && invoice.branchId === branchId)
    .slice()
    .sort((leftInvoice, rightInvoice) =>
      leftInvoice.createdAt.localeCompare(rightInvoice.createdAt),
    );
  const list = invoiceEvents(s, 'sale', branchId, documentType).filter(
    (x) =>
      (status === 'all' || x.status === status) &&
      (!from || x.date >= from) &&
      (!to || x.date <= to) &&
      (x.number + (s.parties.find((party) => party.id === x.partyId)?.name || '')).includes(
        searchQuery,
      ),
  );
  const close = () => {
    setEditingDocument(false);
    setEditor(undefined);
    navigate('/sales');
  };
  const csv = (docs: Invoice[]) =>
    docs.length === 1
      ? exportDocument(invoiceReport(s, docs[0]))
      : exportPdf(
          'فواتير ' + '\u0627\u0644\u0645\u0628\u064A\u0639\u0627\u062A',
          ['الرقم', 'التاريخ', 'الطرف', 'العملة', 'الإجمالي', 'الحالة'],
          docs.map((invoice) => [
            invoice.number,
            invoice.date,
            s.parties.find((party) => party.id === invoice.partyId)?.name || 'نقدي',
            invoice.currency,
            invoice.total,
            invoice.status === 'draft' ? 'مسودة' : 'نهائي',
          ]),
        );
  return {
    s,
    view,
    refresh,
    searchQuery,
    setQ,
    status,
    setStatus,
    documentType,
    setDocumentType,
    from,
    setFrom,
    to,
    setTo,
    editor,
    setEditor,
    setDetail,
    isConfirm,
    setConfirm,
    label,
    current,
    browse,
    list,
    close,
    csv,
  };
}
