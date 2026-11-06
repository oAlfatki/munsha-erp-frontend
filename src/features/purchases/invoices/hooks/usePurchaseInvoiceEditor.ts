import { today } from '@/core/utils/formatters';
import { branchDefaults, operationCashId, systemSettings } from '@/features/organization/public';
import { usePurchaseInvoiceEditorQuery } from '@/features/purchases/invoices/queries/usePurchaseInvoiceEditorQuery';
import type { PurchaseInvoiceEditorProps } from '@/features/purchases/invoices/types/props/PurchaseInvoiceEditorProps';
import type { Invoice, InvoiceLine } from '@/features/trade/public';
import {
  allocateInvoiceDiscount,
  invoiceSchema,
  invoiceSummary,
  useInvoice,
} from '@/features/trade/public';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';
import { validateForm } from '@/shared/ui/forms/ValidatedForm';
import { useEffect, useRef, useState } from 'react';

export function usePurchaseInvoiceEditor({
  invoice,
  onClose: close,
  onLoad,
}: Pick<PurchaseInvoiceEditorProps, 'invoice' | 'onClose' | 'onLoad'>) {

  const { state, branchId, busy: isBusy, setEditingDocument } = usePurchaseInvoiceEditorQuery();
  const invoiceMutationRequest = useInvoice();
  const invoiceForm = useValidatedForm(invoiceSchema, invoiceMutationRequest.execute);
  const invoiceMutation = { ...invoiceMutationRequest, execute: invoiceForm.submit };
  const validationRoot = useRef<HTMLDivElement>(null);
  const isReadOnly = invoice?.status === 'final';
  useEffect(() => {
    setEditingDocument(!isReadOnly);
    return () => setEditingDocument(false);
  }, []);
  const [d, setD] = useState({
    id: invoice?.id,
    kind: 'purchase',
    date: invoice?.date || today(),
    branchId: invoice?.branchId || branchId,
    warehouseId:
      invoice?.warehouseId ||
      branchDefaults(state!, branchId).purchaseWarehouseId ||
      branchDefaults(state!, branchId).warehouseId,
    partyId: invoice?.partyId || '',
    taxRate:
      invoice?.taxRate ??
      (systemSettings(state!).accounting.taxEnabled
        ? systemSettings(state!).accounting.taxRate
        : 0),
    paid: invoice?.paid || 0,
    invoiceDiscount: invoice?.invoiceDiscount || 0,
    currency: invoice?.currency || 'YER',
    rate: invoice?.rate || 1,
    payment: invoice?.payment || ('cash' as 'cash' | 'credit' | 'mixed'),
    cashId: invoice?.cashId || operationCashId(state!, branchId, 'purchase'),
    supplierNumber: invoice?.supplierNumber || '',
    priceType:
      invoice?.priceType || (branchDefaults(state!, branchId).priceType as 'retail' | 'wholesale'),
    note: invoice?.note || '',
  });
  const [isBalanceOpen, setBalanceOpen] = useState(false);
  const [isAddProduct, setAddProduct] = useState(false);
  const [isGridPending, setGridPending] = useState(false);
  const [itemDiscountError, setItemDiscountError] = useState('');
  const [paidInput, setPaidInput] = useState<number | null>(null);
  const [lines, setLines] = useState<InvoiceLine[]>(invoice?.lines || []);
  const [partySearch, setPartySearch] = useState(
    state?.parties.find((party) => party.id === invoice?.partyId)?.name || '',
  );
  if (!state) return null;

  const handleLoadInvoice = (d: Invoice) => {

    if (
      !isReadOnly &&
      lines.length &&
      (!invoice || JSON.stringify(lines) !== JSON.stringify(invoice.lines)) &&
      !window.confirm('تحميل الفاتورة سيستبدل البنود غير المحفوظة. متابعة؟')
    )
      return;
    onLoad(d);
  };

  const summary = invoiceSummary(lines, d.payment, d.paid, d.taxRate, d.invoiceDiscount);
  const party = state.parties.find((party) => party.id === d.partyId);

  function changeItemDiscount(amount: number) {

    const gross = summary.gross;
    if (!Number.isFinite(amount) || amount < 0 || amount > gross) {
      setItemDiscountError('خصم الأصناف يجب أن يكون بين صفر وإجمالي الأصناف');
      return;
    }
    const next = allocateInvoiceDiscount(
      lines.map((invoiceLine) => ({ ...invoiceLine, discount: 0 })),
      amount,
    ).map((l) => ({
      ...l,
      discount: l.qty * l.price ? (l.invoiceDiscount / (l.qty * l.price)) * 100 : 0,
      invoiceDiscount: 0,
    }));
    setItemDiscountError('');
    setLines(next);
  }

  function changePaid(paid: number) {

    setPaidInput(paid);
    const payment = paid <= 0 ? 'credit' : paid >= summary.net ? 'cash' : 'mixed';
    setD({ ...d, paid, payment });
  }

  async function save(status: 'draft' | 'final') {

    if (isGridPending) return;
    if (validationRoot.current && !validateForm(validationRoot.current)) return;
    if (await invoiceMutation.execute({ ...d, lines, status })) close();
  }

  return {
    s: state,
    branchId,
    isBusy,
    validationRoot,
    isReadOnly,
    d,
    setD,
    isBalanceOpen,
    setBalanceOpen,
    isAddProduct,
    setAddProduct,
    isGridPending,
    setGridPending,
    itemDiscountError,
    paidInput,
    setPaidInput,
    lines,
    setLines,
    partySearch,
    setPartySearch,
    handleLoadInvoice,
    summary,
    party,
    changeItemDiscount,
    changePaid,
    save,
  };
}
