import { ROUTES } from '@/core/config/navigation-paths';
import type { DocumentScreenOptions } from '@/shared/types/DocumentScreenOptions';

import { fiscalRange } from '@/features/ledger/public';
import { useSalesInvoicesControllerQuery } from '@/features/sales/invoices/queries/useSalesInvoicesControllerQuery';
import type { Invoice } from '@/features/trade/public';
import { invoiceEvents, invoiceReport } from '@/features/trade/public';
import { exportDocument, exportPdf } from '@/shared/services/report-actions';
import { useEffect, useState } from 'react';

export function useSalesInvoicesController({
  isInitialCreate = false,
  documentId,
}: DocumentScreenOptions = {}) {

  const { state, branchId, navigate, refresh, setEditingDocument } =
    useSalesInvoicesControllerQuery();
  const [searchQuery, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [documentType, setDocumentType] = useState('all');
  const [from, setFrom] = useState(fiscalRange(state!).from);
  const [to, setTo] = useState(fiscalRange(state!).to);
  const [editor, setEditor] = useState<Invoice | null | undefined>();
  const [detail, setDetail] = useState<string | null>(null);
  const [isConfirm, setConfirm] = useState(false);
  useEffect(() => {
    if (isInitialCreate) setEditor(null);
    if (documentId) setDetail(documentId);
  }, [isInitialCreate, documentId]);
  if (!state) return null;
  const label = 'المبيعات';
  const current =
    invoiceEvents(state, 'sale', branchId).find((x) => x.number === detail) ||
    state.invoices.find((invoice) => invoice.id === detail);
  const browse = state.invoices
    .filter((invoice) => invoice.kind === 'sale' && invoice.branchId === branchId)
    .slice()
    .sort((leftInvoice, rightInvoice) =>
      leftInvoice.createdAt.localeCompare(rightInvoice.createdAt),
    );
  const list = invoiceEvents(state, 'sale', branchId, documentType).filter(
    (x) =>
      (status === 'all' || x.status === status) &&
      (!from || x.date >= from) &&
      (!to || x.date <= to) &&
      (x.number + (state.parties.find((party) => party.id === x.partyId)?.name || '')).includes(
        searchQuery,
      ),
  );

  const close = () => {

    setEditingDocument(false);
    setEditor(undefined);
    navigate(ROUTES.SALES);
  };

  const csv = (docs: Invoice[]) =>
    docs.length === 1
      ? exportDocument(invoiceReport(state, docs[0]))
      : exportPdf(
          'فواتير ' + '\u0627\u0644\u0645\u0628\u064A\u0639\u0627\u062A',
          ['الرقم', 'التاريخ', 'الطرف', 'العملة', 'الإجمالي', 'الحالة'],
          docs.map((invoice) => [
            invoice.number,
            invoice.date,
            state.parties.find((party) => party.id === invoice.partyId)?.name || 'نقدي',
            invoice.currency,
            invoice.total,
            invoice.status === 'draft' ? 'مسودة' : 'نهائي',
          ]),
        );

  return {
    s: state,
    isDeepLink: !!documentId,
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
