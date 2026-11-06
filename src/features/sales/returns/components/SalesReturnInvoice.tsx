import { ROUTES } from '@/core/config/navigation-paths';
import { fmt } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { ProductEditor } from '@/features/inventory/public';
import { balance } from '@/features/ledger/public';
import { useSalesReturnController } from '@/features/sales/returns/hooks/useSalesReturnController';
import { ReturnInvoiceActions, returnRemaining } from '@/features/trade/public';
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
import { Plus, Search } from 'lucide-react';

export function SalesReturnInvoice() {

  const model = useSalesReturnController();
  if (!model) return null;
  const {
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
  } = model;
  return (
    <div ref={root}>
      <PageHead
        title={
          '\u0641\u0627\u062A\u0648\u0631\u0629 \u0645\u0631\u062A\u062C\u0639 \u0645\u0628\u064A\u0639\u0627\u062A'
        }
        description="اختر الفاتورة الأصلية ثم كميات المرتجع وخصوماته والمبلغ المعاد. تُراجع الحدود مقابل الأصل قبل الحفظ."
        extra={
          <ReturnInvoiceActions
            report={report}
            isSaveDisabled={isBusy || isLocked || !quote || !!inputError}
            isReportDisabled={!report || !lines.length}
            onSave={() => {
              if (root.current && validateForm(root.current)) setConfirm(true);
            }}
            onReset={() => {
              setId('');
              resetAmounts();
              setHistory('');
              setConfirm(false);
            }}
          />
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
                {state.parties.find((party) => party.id === invoice.partyId)?.name || 'نقدي'}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <DocumentNavigator
        index={sources.findIndex((invoice) => invoice.id === id)}
        count={sources.length}
        onChange={(i) => choose(sources[i])}
        onList={() => navigate(ROUTES.SALES)}
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
              <Field label={'اسم العميل'}>
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
                  const p = state.products.find((product) => product.id === invoiceLine.productId);
                  return (p?.name + ' ' + p?.units.map((u) => u.barcode).join(' ')).includes(
                    e.target.value,
                  );
                });
                if (i >= 0) setActive(i);
              }}
            />
            <p className="invoice-hint">
              الكمية المتاحة في المخزن: {fmt(stockAvailable)}{' '}
              {activeProduct?.units[activeLine?.unit || 0]?.name} · حد الخصم للصنف:{' '}
              {Math.max(activeLine?.discount || 0, activeProduct?.maxDiscount || 0)}%
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
                ...[],
                'سعر الوحدة',
                <span>
                  الخصم %
                  <small className="invoice-hint">
                    المسموح: {Math.max(activeLine?.discount || 0, activeProduct?.maxDiscount || 0)}%
                  </small>
                </span>,
              ]}
              rows={
                shown
                  ? shown.lines.map((invoiceLine) => [
                      state.products.find((product) => product.id === invoiceLine.productId)?.name,
                      state.products.find((product) => product.id === invoiceLine.productId)?.units[
                        invoiceLine.unit
                      ]?.name,
                      '—',
                      fmt(invoiceLine.qty),
                      ...[],
                      fmt(invoiceLine.price),
                      fmt(invoiceLine.discount),
                    ])
                  : selected.lines.flatMap((invoiceLine, index) => {
                      const p = state.products.find(
                        (product) => product.id === invoiceLine.productId,
                      );
                      const remaining = returnRemaining(state, selected, index);
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
                          ...[],
                          fmt(invoiceLine.price),
                          <Field label={'خصم البند ' + (index + 1) + ' %'}>
                            <Input
                              type="number"
                              min={invoiceLine.discount}
                              max={Math.max(invoiceLine.discount, p?.maxDiscount || 0)}
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
              <Field label={'الخصم المسموح به'}>
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
                            ...state,
                            entries: state.entries.filter((entry) => entry.branchId === branchId),
                          },
                          '130',
                          party.id,
                        ),
                      ),
                    ),
                    balance(
                      {
                        ...state,
                        entries: state.entries.filter((entry) => entry.branchId === branchId),
                      },
                      '130',
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
