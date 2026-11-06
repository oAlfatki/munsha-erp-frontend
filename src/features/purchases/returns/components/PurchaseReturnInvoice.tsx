import { ROUTES } from '@/core/config/navigation-paths';

import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { exportDocument, printReport } from '@/core/reporting/service';
import { fmt, today } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { ProductEditor } from '@/features/inventory/public';
import { balance, isArchived } from '@/features/ledger/public';
import { usePurchaseReturnInvoiceQuery } from '@/features/purchases/returns/queries/usePurchaseReturnInvoiceQuery';
import type { Invoice } from '@/features/trade/public';
import {
  invoiceReport,
  partialReturnSchema,
  quoteReturn,
  returnRemaining,
  usePartialReturn,
} from '@/features/trade/public';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { DocumentNavigator } from '@/shared/ui/documents/DocumentNavigator';
import { TotalsFooter } from '@/shared/ui/documents/TotalsFooter';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { validateForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Download, Plus, Printer, Save, Search, Undo2 } from 'lucide-react';
import { useRef, useState } from 'react';
export function PurchaseReturnInvoice() {
  const root = useRef<HTMLDivElement>(null);
  const { state: s, branchId, busy: isBusy, navigate } = usePurchaseReturnInvoiceQuery();
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
  if (!s) return null;
  const sources = s.invoices.filter(
    (invoice) =>
      invoice.kind === 'purchase' && invoice.branchId === branchId && invoice.status === 'final',
  );
  const selected = sources.find((invoice) => invoice.id === id);
  const saved = (s.invoiceReturns || []).filter((r) => r.sourceId === id);
  const shown =
    (history === 'latest' ? saved.at(-1) : saved.find((r) => r.id === history)) ||
    (selected?.reversedBy
      ? {
          ...selected,
          number: selected.reversedBy,
          date:
            s.entries.find((entry) => entry.reference === selected.reversedBy)?.date ||
            selected.date,
        }
      : undefined);
  const matches = sources.filter((invoice) =>
    (
      invoice.number +
      ' ' +
      (invoice.reversedBy || '') +
      ' ' +
      (s.invoiceReturns || [])
        .filter((r) => r.sourceId === invoice.id)
        .map((r) => r.number)
        .join(' ') +
      ' ' +
      (s.parties.find((party) => party.id === invoice.partyId)?.name || '')
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
      (s.invoiceReturns || []).find((r) => r.sourceId === invoice.id && r.number === search.trim())
        ?.id || '',
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
          qty: Number(quantities[index] ?? returnRemaining(s, selected, index).qty),
          discount: discounts[index],
        }))
        .filter((v) => v.qty > 0)
    : [];
  let quote: ReturnType<typeof quoteReturn> | undefined;
  let quoteError = '';
  if (selected && !shown && picks.length)
    try {
      quote = quoteReturn(s, selected, picks, headerDiscount, paid);
    } catch (e) {
      quoteError = (e as Error).message;
    }
  const lines = shown?.lines || quote?.lines || [];
  const subtotal = shown?.subtotal ?? quote?.subtotal ?? 0;
  const tax = shown?.taxAmount ?? quote?.tax ?? 0;
  const total = shown?.total ?? quote?.total ?? 0;
  const refund = shown?.paid ?? quote?.paid ?? 0;
  const party = s.parties.find((party) => party.id === selected?.partyId);
  const isLocked = !!shown || !!selected?.reversedBy || isArchived(s);
  const isAvailable = selected?.lines.some(
    (invoiceLine, i) => returnRemaining(s, selected, i).qty > 0,
  );
  const report = selected
    ? invoiceReport(s, {
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
  const activeProduct = s.products.find((product) => product.id === activeLine?.productId);
  const stockAvailable = activeLine
    ? (s.stocks.find(
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
  return (
    <div ref={root}>
      <PageHead
        title={
          '\u0641\u0627\u062A\u0648\u0631\u0629 \u0645\u0631\u062A\u062C\u0639 \u0634\u0631\u0627\u0621'
        }
        description="اختر الفاتورة الأصلية ثم كميات المرتجع وخصوماته والمبلغ المعاد. تُراجع الحدود مقابل الأصل قبل الحفظ."
        extra={
          <div className="flex flex-wrap gap-2">
            <Button
              disabled={isBusy || isLocked || !quote || !!inputError}
              onClick={() => {
                if (root.current && validateForm(root.current)) setConfirm(true);
              }}
            >
              <Save size={16} />
              حفظ المرتجع
            </Button>
            <Button
              variant="outline"
              disabled={!report || !lines.length}
              onClick={() => report && printReport(report)}
            >
              <Printer size={16} />
              طباعة
            </Button>
            <Button
              variant="outline"
              disabled={!report || !lines.length}
              onClick={() => report && exportDocument(report)}
            >
              <Download size={16} />
              تصدير
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setId('');
                resetAmounts();
                setHistory('');
                setConfirm(false);
              }}
            >
              <Undo2 size={16} />
              تراجع
            </Button>
          </div>
        }
      />
      <div className="filter-bar">
        <Field label="البحث برقم الفاتورة أو الطرف">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} />
        </Field>
        <Button
          variant="outline"
          disabled={!matches.length}
          onClick={() => matches[0] && choose(matches[0])}
        >
          <Search size={16} />
          بحث وتحميل
        </Button>
        <Field label="الفاتورة الأصلية">
          <Select
            value={id}
            onChange={(e) => {
              const d = sources.find((invoice) => invoice.id === e.target.value);
              if (d) choose(d);
              else setId('');
            }}
          >
            <option value="">اختر الفاتورة</option>
            {matches.map((invoice) => (
              <option key={invoice.id} value={invoice.id}>
                {invoice.number} ·{' '}
                {s.parties.find((party) => party.id === invoice.partyId)?.name || 'نقدي'}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <DocumentNavigator
        index={sources.findIndex((invoice) => invoice.id === id)}
        count={sources.length}
        onChange={(i) => choose(sources[i])}
        onList={() => navigate(ROUTES.PURCHASES)}
      />
      {selected ? (
        <>
          <section className="panel form-panel">
            <div className="form-section-title">
              <h2>{shown?.number || 'مرتجع جديد — ' + selected.number}</h2>
              <Pill>
                {shown ? 'مرتجع محفوظ' : isAvailable ? 'حدد الكميات' : 'استُنفدت الكميات'}
              </Pill>
            </div>
            <div className="form-grid">
              <Field label="تاريخ المرتجع *">
                <Input
                  type="date"
                  disabled={isLocked}
                  min={selected.date}
                  value={shown?.date || date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Field>
              <Field label={'اسم المورد'}>
                <Input readOnly value={party?.name || 'نقدي'} />
                {party && (
                  <Button type="button" variant="outline" onClick={() => setBalanceOpen(true)}>
                    إجمالي الرصيد
                  </Button>
                )}
              </Field>
              <Field label="رقم الهاتف">
                <Input readOnly value={party?.phone || ''} />
              </Field>
              <Field label="العملة / سعر الصرف">
                <Input readOnly value={selected.currency + ' / ' + selected.rate} />
              </Field>
              <Field label={quote?.changed ? 'سبب تعديل خصومات المرتجع *' : 'سبب المرتجع'}>
                <Input
                  disabled={isLocked}
                  value={shown?.note || note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Field>
            </div>
          </section>
          <section className="panel form-panel">
            <div className="form-section-title">
              <h2>أصناف الفاتورة الأصلية</h2>
              <Button variant="outline" disabled={isLocked} onClick={() => setAddProduct(true)}>
                <Plus size={16} />
                إضافة صنف
              </Button>
            </div>
            <Input
              aria-label="البحث في أصناف الفاتورة الأصلية"
              placeholder="اسم الصنف أو الباركود…"
              value={itemSearch}
              onChange={(e) => {
                setItemSearch(e.target.value);
                const i = selected.lines.findIndex((invoiceLine) => {
                  const p = s.products.find((product) => product.id === invoiceLine.productId);
                  return (p?.name + ' ' + p?.units.map((u) => u.barcode).join(' ')).includes(
                    e.target.value,
                  );
                });
                if (i >= 0) setActive(i);
              }}
            />
            <p className="invoice-hint">
              الكمية المتاحة في المخزن: {fmt(stockAvailable)}{' '}
              {activeProduct?.units[activeLine?.unit || 0]?.name} · حد الخصم للصنف: {100}%
            </p>
            <DataTable
              headers={[
                'اسم الصنف',
                'الوحدة',
                'المتبقي للإرجاع',
                <span>
                  الكمية المرتجعة
                  <small className="invoice-hint">
                    المتاح: {fmt(stockAvailable)}{' '}
                    {activeProduct?.units[activeLine?.unit || 0]?.name}
                  </small>
                </span>,
                ...['المجاني المرتجع'],
                'سعر الوحدة',
                <span>
                  الخصم %<small className="invoice-hint">المسموح: {100}%</small>
                </span>,
              ]}
              rows={
                shown
                  ? shown.lines.map((invoiceLine) => [
                      s.products.find((product) => product.id === invoiceLine.productId)?.name,
                      s.products.find((product) => product.id === invoiceLine.productId)?.units[
                        invoiceLine.unit
                      ]?.name,
                      '—',
                      fmt(invoiceLine.qty),
                      ...[fmt(invoiceLine.free)],
                      fmt(invoiceLine.price),
                      fmt(invoiceLine.discount),
                    ])
                  : selected.lines.flatMap((invoiceLine, index) => {
                      const p = s.products.find((product) => product.id === invoiceLine.productId);
                      const remaining = returnRemaining(s, selected, index);
                      const searchQuery = quantities[index] ?? String(remaining.qty);
                      if (
                        itemSearch &&
                        !(
                          p?.name +
                          ' ' +
                          p?.code +
                          ' ' +
                          p?.units.map((u) => u.barcode).join(' ')
                        ).includes(itemSearch)
                      )
                        return [];
                      return [
                        [
                          p?.name,
                          p?.units[invoiceLine.unit]?.name,
                          fmt(remaining.qty),
                          <Field label={'الكمية المرتجعة ' + (index + 1)}>
                            <Input
                              type="number"
                              min="0"
                              max={remaining.qty}
                              step="any"
                              disabled={isLocked || remaining.qty === 0}
                              value={searchQuery}
                              onFocus={() => setActive(index)}
                              onChange={(e) => {
                                setInputError('');
                                setQuantities({ ...quantities, [index]: e.target.value });
                                setHeaderDiscount(undefined);
                                setPaid(undefined);
                              }}
                            />
                          </Field>,
                          ...[fmt((invoiceLine.free * Number(searchQuery)) / invoiceLine.qty)],
                          fmt(invoiceLine.price),
                          <Field label={'خصم البند ' + (index + 1) + ' %'}>
                            <Input
                              type="number"
                              min={invoiceLine.discount}
                              max={100}
                              step="any"
                              disabled={isLocked || remaining.qty === 0}
                              value={discounts[index] ?? invoiceLine.discount}
                              onFocus={() => setActive(index)}
                              onChange={(e) => {
                                setInputError('');
                                setDiscounts({ ...discounts, [index]: +e.target.value });
                              }}
                            />
                          </Field>,
                        ],
                      ];
                    })
              }
            />
          </section>
          <section className="panel form-panel">
            <div className="form-grid">
              <Field label="خصم الأصناف">
                <Input
                  disabled={isLocked}
                  type="number"
                  min="0"
                  step=".01"
                  value={money(
                    lines.reduce(
                      (n, invoiceLine) =>
                        n +
                        money((invoiceLine.qty * invoiceLine.price * invoiceLine.discount) / 100),
                      0,
                    ),
                  )}
                  onChange={(e) => changeTotalDiscount(+e.target.value)}
                />
              </Field>
              <Field label={'الخصم المكتسب'}>
                <Input
                  disabled={isLocked}
                  type="number"
                  min="0"
                  step=".01"
                  value={headerDiscount ?? shown?.invoiceDiscount ?? quote?.headerDiscount ?? 0}
                  onChange={(e) => setHeaderDiscount(+e.target.value)}
                />
              </Field>
              <Field label="المبلغ المعاد نقدًا">
                <Input
                  disabled={isLocked}
                  type="number"
                  min={quote?.minPaid || 0}
                  max={quote?.maxPaid}
                  step=".01"
                  value={paid ?? refund}
                  onChange={(e) => setPaid(+e.target.value)}
                />
              </Field>
            </div>
            {(quoteError || inputError) && (
              <p role="alert" className="field-error">
                {quoteError || inputError}
              </p>
            )}
            <TotalsFooter
              rows={[
                ['قبل الضريبة', subtotal],
                ['الضريبة', tax],
                ['صافي المرتجع', total],
                ['المعاد للصندوق', refund],
                ['تسوية الذمة', money(total - refund)],
              ]}
              amount={total}
              currency={selected.currency}
            />
          </section>
          <p className="info-note">
            الصفر يستبعد البند؛ البحث يخفي الصفوف فقط. الطرف والأسعار والتكلفة مرتبطة بالأصل. يمكن
            زيادة الخصم لتخفيض قيمة الرد مع إدخال السبب، ولا يجوز رد قيمة أعلى من الأصل. النقد
            المعاد لا يتجاوز المتبقي من المدفوع الأصلي؛ التحصيلات اللاحقة لا تُرد تلقائيًا. الطباعة
            قبل الحفظ مسودة.
          </p>
          <h2 className="section-heading">المرتجعات المحفوظة</h2>
          <DataTable
            headers={['الرقم', 'التاريخ', 'المبلغ', 'عرض']}
            rows={saved.map((r) => [
              r.number,
              r.date,
              fmt(r.total),
              <Button variant="outline" onClick={() => setHistory(r.id)}>
                عرض
              </Button>,
            ])}
          />
          {shown && isAvailable && (
            <Button
              variant="outline"
              onClick={() => {
                setHistory('');
                resetAmounts();
              }}
            >
              إنشاء مرتجع من المتبقي
            </Button>
          )}
        </>
      ) : (
        <section className="panel form-panel">
          <p>اختر الفاتورة الأصلية لعرض بنودها.</p>
        </section>
      )}
      <Modal isOpen={isBalanceOpen} title="إجمالي رصيد الطرف" onClose={() => setBalanceOpen(false)}>
        <DataTable
          headers={['اسم الحساب', 'الهاتف', 'الرصيد YER', 'الحالة']}
          rows={
            party
              ? [
                  [
                    party.name,
                    party.phone || '—',
                    fmt(
                      Math.abs(
                        balance(
                          {
                            ...s,
                            entries: s.entries.filter((entry) => entry.branchId === branchId),
                          },
                          '210',
                          party.id,
                        ),
                      ),
                    ),
                    balance(
                      { ...s, entries: s.entries.filter((entry) => entry.branchId === branchId) },
                      '210',
                      party.id,
                    ) >= 0
                      ? 'مدين'
                      : 'دائن',
                  ],
                ]
              : []
          }
        />
      </Modal>
      {isAddProduct && <ProductEditor product={null} onClose={() => setAddProduct(false)} />}
      <Modal
        isOpen={isConfirm}
        title="تأكيد حفظ المرتجع"
        onClose={() => setConfirm(false)}
        description="يعاد التحقق من الكميات والخصومات والنقد والذمة في الخادم قبل تثبيت المستند."
      >
        <p>
          {selected?.number} · {fmt(total)} {selected?.currency}
        </p>
        <div className="dialog-actions">
          <Button
            disabled={isBusy || isLocked || !quote}
            onClick={async () => {
              if (
                await partialReturnMutation.execute({
                  id,
                  date,
                  note,
                  lines: picks,
                  invoiceDiscount: headerDiscount,
                  paid,
                })
              ) {
                setConfirm(false);
                setHistory('latest');
                resetAmounts();
              }
            }}
          >
            تأكيد حفظ المرتجع
          </Button>
          <Button variant="ghost" onClick={() => setConfirm(false)}>
            تراجع
          </Button>
        </div>
      </Modal>
    </div>
  );
}
