import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { exportDocument, exportPdf, printReport } from '@/core/reporting/service';
import { today } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { useDeleteStockDraft } from '@/features/inventory/stock-balances/hooks/useDeleteStockDraft';
import { useStockDocumentsQuery } from '@/features/inventory/stock-documents/queries/useStockDocumentsQuery';
import type { StockDocumentsProps } from '@/features/inventory/stock-documents/types/props/StockDocumentsProps';
import { fiscalRange } from '@/features/ledger/public';
import type { StockDocument, StockDocumentLine } from '@/features/stock/public';
import {
  deleteStockDraftSchema,
  stockDocumentReport,
  stockDocumentSchema,
  useStockDocument,
} from '@/features/stock/public';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
/** Screen state, commands and derived values; no route-based dispatch. */
export function useStockDocumentsController({ kind }: StockDocumentsProps) {
  const { state: s, branchId, busy: isBusy } = useStockDocumentsQuery();
  const deleteStockDraftMutationRequest = useDeleteStockDraft();
  const deleteStockDraftForm = useValidatedForm(
    deleteStockDraftSchema,
    deleteStockDraftMutationRequest.execute,
  );
  const deleteStockDraftMutation = {
    ...deleteStockDraftMutationRequest,
    execute: deleteStockDraftForm.submit,
  };
  const stockDocumentMutationRequest = useStockDocument();
  const stockDocumentForm = useValidatedForm(
    stockDocumentSchema,
    stockDocumentMutationRequest.execute,
  );
  const stockDocumentMutation = {
    ...stockDocumentMutationRequest,
    execute: stockDocumentForm.submit,
  };
  const [selected, setSelected] = useState<StockDocument | null>(null);
  const [isListMode, setListMode] = useState(false);
  const [date, setDate] = useState(kind === 'opening' ? fiscalRange(s!).from : today());
  const [warehouse, setWarehouse] = useState('');
  const [to, setTo] = useState('');
  const [direction, setDirection] = useState<'shortage' | 'excess'>('shortage');
  const [currency, setCurrency] = useState('YER');
  const [rate, setRate] = useState(1);
  const [note, setNote] = useState('');
  const [lines, setLines] = useState<StockDocumentLine[]>([]);
  const [searchQuery, setQ] = useState('');
  const [isConfirm, setConfirm] = useState(false);
  const [isDirty, setDirty] = useState(false);
  const [documentQuery, setDocumentQuery] = useState('');
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [offset, setOffset] = useState('300');
  const [isPrintRequested, setPrintRequested] = useState(false);
  useEffect(() => {
    if (isPrintRequested && !isListMode && selected) {
      printReport(stockDocumentReport(s!, selected));
      setPrintRequested(false);
    }
  }, [isPrintRequested, isListMode, selected]);
  if (!s) return null;
  const title =
    kind === 'transfer'
      ? 'فاتورة تحويل مخزني'
      : kind === 'adjustment'
        ? 'فاتورة تسوية المخزون'
        : 'إضافة أصناف بداية المدة';
  const own = s.warehouses.filter(
    (warehouse) => warehouse.branchId === branchId && warehouse.active,
  );
  const wh = warehouse || own[0]?.id || '';
  const legacyCombined = new Set(
    (s.stockDocuments || []).filter((d) => d.lines.length && d.accounts.length).map((d) => d.id),
  );
  const docs = (s.stockDocuments || [])
    .filter(
      (d) =>
        d.kind === kind &&
        d.branchId === branchId &&
        (kind !== 'opening' || d.openingScope === 'stock' || d.lines.length > 0),
    )
    .map((d) =>
      kind === 'opening'
        ? {
            ...d,
            openingScope: 'stock' as const,
            accounts: [],
            total: money(d.lines.reduce((n, l) => n + (l.value ?? l.qty * l.price * d.rate), 0)),
          }
        : d,
    )
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const isReadOnly =
    selected?.status === 'final' || (!!selected && legacyCombined.has(selected.id));
  const stockValue = (l: StockDocumentLine) => {
    const product = s.products.find((product) => product.id === l.productId),
      st = s.stocks.find((v) => v.productId === l.productId && v.warehouseId === wh);
    return (
      l.value ??
      (kind === 'opening'
        ? money(l.qty * l.price * rate)
        : money((st?.qty ? st.value / st.qty : 0) * l.qty * (product?.units[l.unit]?.factor || 1)))
    );
  };
  const inventory = money(lines.reduce((n, l) => n + stockValue(l), 0));
  const total = inventory;
  const isFinalizedBranch = s.entries.some(
    (entry) =>
      entry.branchId === branchId &&
      !(s.stockDocuments || []).some(
        (d) => d.kind === 'opening' && d.reference === entry.reference,
      ),
  );
  const load = (d: StockDocument) => {
    setSelected(d);
    setOffset(d.openingOffsetAccount || '300');
    setDate(d.date);
    setWarehouse(d.warehouseId);
    setTo(d.toWarehouseId);
    setDirection(d.direction);
    setCurrency(d.currency);
    setRate(d.rate);
    setNote(d.note);
    setLines(structuredClone(d.lines));
    setListMode(false);
    setDirty(false);
  };
  const handleReset = () => {
    setSelected(null);
    setDate(kind === 'opening' ? fiscalRange(s).from : today());
    setWarehouse(own[0]?.id || '');
    setTo('');
    setDirection('shortage');
    setCurrency('YER');
    setRate(1);
    setNote('');
    setLines([]);
    setDirty(false);
    setListMode(false);
  };
  const handleBrowse = (index: number) => {
    if (isDirty) {
      toast.info('احفظ المسودة أو اضغط تراجع قبل التنقل.');
      return;
    }
    load(docs[index]);
  };
  const update = (i: number, key: string, value: number) => {
    setDirty(true);
    setLines(lines.map((l, j) => (i === j ? { ...l, [key]: value, value: undefined } : l)));
  };
  const add = (id: string) => {
    if (lines.some((l) => l.productId === id)) {
      toast.info('الصنف موجود؛ عدّل كمية السطر الحالي.');
      return;
    }
    const product = s.products.find((product) => product.id === id)!,
      scanned = product.units.findIndex((u) => u.barcode && u.barcode === searchQuery.trim()),
      st = s.stocks.find((v) => v.productId === id && v.warehouseId === wh);
    setLines([
      ...lines,
      {
        productId: id,
        unit: scanned >= 0 ? scanned : product.units.length - 1,
        qty: 1,
        price: 0,
        expectedQty: st?.qty || 0,
      },
    ]);
    setQ('');
    setDirty(true);
  };
  const match = s.products
    .filter(
      (product) =>
        product.active &&
        (product.name + product.code + product.units.map((u) => u.barcode).join(' '))
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    )
    .slice(0, 6);
  const outputRows = lines.map((l) => {
    const product = s.products.find((product) => product.id === l.productId)!;
    return [
      product.name,
      product.units[l.unit]?.name || '',
      l.qty,
      kind === 'opening' ? l.price : l.qty ? stockValue(l) / l.qty : 0,
      money(stockValue(l)),
    ];
  });
  const handleExportCurrent = () =>
    !isListMode && selected?.status === 'final'
      ? exportDocument(stockDocumentReport(s, selected))
      : isListMode
        ? exportPdf(
            title,
            ['المرجع', 'التاريخ', 'عدد الأصناف', 'القيمة YER', 'الحالة'],
            docs.map((d) => [
              d.reference,
              d.date,
              d.lines.length,
              d.total,
              d.status === 'final' ? 'نهائي' : 'مسودة',
            ]),
          )
        : exportPdf(title, ['الصنف', 'الوحدة', 'الكمية', 'تكلفة الوحدة', 'القيمة YER'], outputRows);
  async function save(status: 'draft' | 'final') {
    if (
      await stockDocumentMutation.execute({
        id: selected?.id,
        kind,
        openingScope: kind === 'opening' ? 'stock' : undefined,
        openingOffsetAccount: kind === 'opening' ? offset : undefined,
        status,
        date,
        branchId,
        warehouseId: wh,
        toWarehouseId: to,
        currency,
        rate,
        direction,
        note,
        lines,
        accounts: [],
      })
    ) {
      setConfirm(false);
      handleReset();
      setListMode(true);
    }
  }
  return {
    setConfirm,
    title,
    isDirty,
    setListMode,
    isListMode,
    handleReset,
    handleExportCurrent,
    documentQuery,
    setDocumentQuery,
    setSearchOpen,
    isSearchOpen,
    docs,
    load,
    setPrintRequested,
    s,
    selected,
    handleBrowse,
    isReadOnly,
    date,
    setDate,
    setDirty,
    lines,
    wh,
    setWarehouse,
    own,
    to,
    setTo,
    direction,
    setDirection,
    currency,
    setCurrency,
    setRate,
    rate,
    branchId,
    offset,
    setOffset,
    note,
    setNote,
    match,
    add,
    searchQuery,
    setQ,
    update,
    stockValue,
    setLines,
    inventory,
    isBusy,
    isFinalizedBranch,
    save,
    deleteStockDraftMutation,
    isConfirm,
    total,
  };
}
