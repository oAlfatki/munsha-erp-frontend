import { ROUTES } from '@/core/config/navigation-paths';
import type { DocumentScreenOptions } from '@/shared/types/DocumentScreenOptions';

import { exportDocument, exportPdf } from '@/core/reporting/service';
import { fiscalRange } from '@/features/ledger/public/fiscal-range';
import { usePurchaseInvoicesControllerQuery } from '@/features/purchases/queries/usePurchaseInvoicesControllerQuery';
import { invoiceReport } from '@/features/trade/public/build-invoice-document';
import { invoiceEvents } from '@/features/trade/public/invoice-events';
import type { Invoice } from '@/features/trade/public/types/models/Invoice';
import { useEffect, useState } from 'react';
export function usePurchaseInvoicesController({
  isInitialCreate = false,
  documentId,
}: DocumentScreenOptions = {}) {
  const {
    state: s,
    branchId,
    navigate,
    refresh,
    setEditingDocument,
  } = usePurchaseInvoicesControllerQuery();
  const [searchQuery, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [documentType, setDocumentType] = useState('all');
  const [from, setFrom] = useState(fiscalRange(s!).from);
  const [to, setTo] = useState(fiscalRange(s!).to);
  const [editor, setEditor] = useState<Invoice | null | undefined>();
  const [detail, setDetail] = useState<string | null>(null);
  const [isConfirm, setConfirm] = useState(false);
  useEffect(() => {
    if (isInitialCreate) setEditor(null);
    if (documentId) setDetail(documentId);
  }, [isInitialCreate, documentId]);
  if (!s) return null;
  const label = 'المشتريات';
  const current =
    invoiceEvents(s, 'purchase', branchId).find((x) => x.number === detail) ||
    s.invoices.find((invoice) => invoice.id === detail);
  const browse = s.invoices
    .filter((invoice) => invoice.kind === 'purchase' && invoice.branchId === branchId)
    .slice()
    .sort((leftInvoice, rightInvoice) =>
      leftInvoice.createdAt.localeCompare(rightInvoice.createdAt),
    );
  const list = invoiceEvents(s, 'purchase', branchId, documentType).filter(
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
    navigate(ROUTES.PURCHASES);
  };
  const csv = (docs: Invoice[]) =>
    docs.length === 1
      ? exportDocument(invoiceReport(s, docs[0]))
      : exportPdf(
          'فواتير ' + '\u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A',
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
