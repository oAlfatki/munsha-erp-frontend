import { today } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { isArchived } from '@/features/ledger/public';
import { usePurchaseReturnInvoiceQuery } from '@/features/purchases/returns/queries/usePurchaseReturnInvoiceQuery';
import type { Invoice } from '@/features/trade/public';
import {
  invoiceReport,
  partialReturnSchema,
  quoteReturn,
  returnRemaining,
  usePartialReturn,
} from '@/features/trade/public';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';
import { useRef, useState } from 'react';

export function usePurchaseReturnController() {

  const root = useRef<HTMLDivElement>(null);
  const { state, branchId, busy: isBusy, navigate } = usePurchaseReturnInvoiceQuery();
  const partialReturnMutationRequest = usePartialReturn();
  const partialReturnForm = useValidatedForm(
    partialReturnSchema,
    partialReturnMutationRequest.execute,
  );
  const partialReturnMutation = {
    ...partialReturnMutationRequest,
    execute: partialReturnForm.submit,
  };
  const [search, setSearch] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [id, setId] = useState('');
  const [date, setDate] = useState(today());
  const [note, setNote] = useState('');
  const [isConfirm, setConfirm] = useState(false);
  const [quantities, setQuantities] = useState<Record<number, string>>({});
  const [discounts, setDiscounts] = useState<Record<number, number>>({});
  const [headerDiscount, setHeaderDiscount] = useState<number | undefined>();
  const [paid, setPaid] = useState<number | undefined>();
  const [history, setHistory] = useState('');
  const [active, setActive] = useState(0);
  const [isBalanceOpen, setBalanceOpen] = useState(false);
  const [isAddProduct, setAddProduct] = useState(false);
  const [inputError, setInputError] = useState('');
  if (!state) return null;
  const sources = state.invoices.filter(
    (invoice) =>
      invoice.kind === 'purchase' && invoice.branchId === branchId && invoice.status === 'final',
  );
  const selected = sources.find((invoice) => invoice.id === id);
  const saved = (state.invoiceReturns || []).filter((r) => r.sourceId === id);
  const shown =
    (history === 'latest' ? saved.at(-1) : saved.find((r) => r.id === history)) ||
    (selected?.reversedBy
      ? {
          ...selected,
          number: selected.reversedBy,
          date:
            state.entries.find((entry) => entry.reference === selected.reversedBy)?.date ||
            selected.date,
        }
      : undefined);
  const matches = sources.filter((invoice) =>
    (
      invoice.number +
      ' ' +
      (invoice.reversedBy || '') +
      ' ' +
      (state.invoiceReturns || [])
        .filter((r) => r.sourceId === invoice.id)
        .map((r) => r.number)
        .join(' ') +
      ' ' +
      (state.parties.find((party) => party.id === invoice.partyId)?.name || '')
    ).includes(search),
  );

  const resetAmounts = () => {

    setQuantities({});
    setDiscounts({});
    setHeaderDiscount(undefined);
    setPaid(undefined);
    setInputError('');
  };

  const choose = (invoice: Invoice) => {

    setId(invoice.id);
    resetAmounts();
    setHistory(
      (state.invoiceReturns || []).find(
        (r) => r.sourceId === invoice.id && r.number === search.trim(),
      )?.id || '',
    );
    setNote('');
    setDate(invoice.date > today() ? invoice.date : today());
    setSearch('');
    setItemSearch('');
    setActive(0);
  };

  const picks = selected
    ? selected.lines
        .map((invoiceLine, index) => ({
          index,
          qty: Number(quantities[index] ?? returnRemaining(state, selected, index).qty),
          discount: discounts[index],
        }))
        .filter((v) => v.qty > 0)
    : [];
  let quote: ReturnType<typeof quoteReturn> | undefined;
  let quoteError = '';
  if (selected && !shown && picks.length)
    try {
      quote = quoteReturn(state, selected, picks, headerDiscount, paid);
    } catch (e) {
      quoteError = (e as Error).message;
    }
  const lines = shown?.lines || quote?.lines || [];
  const subtotal = shown?.subtotal ?? quote?.subtotal ?? 0;
  const tax = shown?.taxAmount ?? quote?.tax ?? 0;
  const total = shown?.total ?? quote?.total ?? 0;
  const refund = shown?.paid ?? quote?.paid ?? 0;
  const party = state.parties.find((party) => party.id === selected?.partyId);
  const isLocked = !!shown || !!selected?.reversedBy || isArchived(state);
  const isAvailable = selected?.lines.some(
    (invoiceLine, i) => returnRemaining(state, selected, i).qty > 0,
  );
  const report = selected
    ? invoiceReport(state, {
        ...selected,
        ...shown,
        id: selected.id,
        number: shown?.number || 'RET-' + selected.number + '-مسودة',
        date: shown?.date || date,
        lines,
        note: shown?.note || note,
        status: shown ? 'final' : 'draft',
        subtotal,
        taxAmount: tax,
        total,
        paid: refund,
      })
    : undefined;
  const activeLine = selected?.lines[active];
  const activeProduct = state.products.find((product) => product.id === activeLine?.productId);
  const stockAvailable = activeLine
    ? (state.stocks.find(
        (v) => v.productId === activeLine.productId && v.warehouseId === selected?.warehouseId,
      )?.qty || 0) / (activeProduct?.units[activeLine.unit]?.factor || 1)
    : 0;

  const changeTotalDiscount = (amount: number) => {

    const gross = money(
        lines.reduce((n, invoiceLine) => n + invoiceLine.qty * invoiceLine.price, 0),
      ),
      percent = gross ? (amount / gross) * 100 : 0;
    if (
      !Number.isFinite(amount) ||
      amount < 0 ||
      amount > gross ||
      picks.some((v) => percent < (selected?.lines[v.index].discount || 0))
    ) {
      setInputError('خصم الأصناف في المرتجع لا يقل عن خصم الفاتورة الأصلية');
      return;
    }
    setInputError('');
    setDiscounts(Object.fromEntries(picks.map((v) => [v.index, percent])));
  };

  return {
    root,
    s: state,
    branchId,
    isBusy,
    navigate,
    partialReturnMutation,
    search,
    setSearch,
    itemSearch,
    setItemSearch,
    id,
    setId,
    date,
    setDate,
    note,
    setNote,
    isConfirm,
    setConfirm,
    quantities,
    setQuantities,
    discounts,
    setDiscounts,
    headerDiscount,
    setHeaderDiscount,
    paid,
    setPaid,
    setHistory,
    setActive,
    isBalanceOpen,
    setBalanceOpen,
    isAddProduct,
    setAddProduct,
    inputError,
    setInputError,
    sources,
    selected,
    saved,
    shown,
    matches,
    resetAmounts,
    choose,
    picks,
    quote,
    quoteError,
    lines,
    subtotal,
    tax,
    total,
    refund,
    party,
    isLocked,
    isAvailable,
    report,
    activeLine,
    activeProduct,
    stockAvailable,
    changeTotalDiscount,
  };
}
