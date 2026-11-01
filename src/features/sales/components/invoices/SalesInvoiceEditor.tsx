import { Modal } from '@/shared/ui/dialogs/Modal';
import { DocumentNavigator } from '@/shared/ui/documents/DocumentNavigator';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { validateForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { useErpContext } from '@/core/hooks/useErpContext';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { printReport } from '@/core/reporting/service';
import { fmt, today } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { cashOptions } from '@/features/accounting/services/models/cash';
import { ProductEditor } from '@/features/inventory/components/Catalog';
import { invoiceReport } from '@/features/reports/services/models/report-documents';
import type { SalesInvoiceEditorProps } from '@/features/sales/types/SalesInvoiceEditorProps';
import {
  branchDefaults,
  operationCashId,
  systemSettings,
} from '@/features/settings/services/models/system-settings';
import { InvoiceLineGrid } from '@/features/trade/components/InvoiceLineGrid';
import { InvoiceLookup } from '@/features/trade/components/InvoiceLookup';
import { InvoiceTotals } from '@/features/trade/components/InvoiceTotals';
import { useInvoice } from '@/features/trade/hooks/useInvoice';
import { allocateInvoiceDiscount } from '@/features/trade/services/models/invoice-discounts';
import { invoiceSummary } from '@/features/trade/services/models/presentation';
import type { Invoice } from '@/features/trade/types/models/Invoice';
import type { InvoiceLine } from '@/features/trade/types/models/InvoiceLine';
import { invoiceSchema } from '@/features/trade/validation/trade-schema';
import { ArrowRight, Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
export function SalesInvoiceEditor({
  invoice,
  onClose: close,
  onLoad,
  onNew,
}: SalesInvoiceEditorProps) {
  const { state: s, branchId, busy: isBusy, setEditingDocument } = useErpContext();
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
    kind: 'sale',
    date: invoice?.date || today(),
    branchId: invoice?.branchId || branchId,
    warehouseId: invoice?.warehouseId || branchDefaults(s!, branchId).warehouseId,
    partyId: invoice?.partyId || '',
    taxRate:
      invoice?.taxRate ??
      (systemSettings(s!).accounting.taxEnabled ? systemSettings(s!).accounting.taxRate : 0),
    paid: invoice?.paid || 0,
    invoiceDiscount: invoice?.invoiceDiscount || 0,
    currency: invoice?.currency || 'YER',
    rate: invoice?.rate || 1,
    payment: invoice?.payment || ('cash' as 'cash' | 'credit' | 'mixed'),
    cashId: invoice?.cashId || operationCashId(s!, branchId, 'sale'),
    supplierNumber: invoice?.supplierNumber || '',
    priceType:
      invoice?.priceType || (branchDefaults(s!, branchId).priceType as 'retail' | 'wholesale'),
    note: invoice?.note || '',
  });
  const [isBalanceOpen, setBalanceOpen] = useState(false);
  const [isAddProduct, setAddProduct] = useState(false);
  const [isGridPending, setGridPending] = useState(false);
  const [itemDiscountError, setItemDiscountError] = useState('');
  const [paidInput, setPaidInput] = useState<number | null>(null);
  const [lines, setLines] = useState<InvoiceLine[]>(invoice?.lines || []);
  const [partySearch, setPartySearch] = useState(
    s?.parties.find((party) => party.id === invoice?.partyId)?.name || '',
  );
  if (!s) return null;
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
  const party = s.parties.find((party) => party.id === d.partyId);
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
    if (
      next.some(
        (l) =>
          l.discount >
          Math.min(
            s!.products.find((product) => product.id === l.productId)!.maxDiscount,
            systemSettings(s!).sales.maxDiscount,
          ) +
            0.00001,
      )
    ) {
      setItemDiscountError('الخصم يتجاوز الحد المسموح لأحد الأصناف');
      return;
    }
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
  return (
    <div ref={validationRoot}>
      <PageHead
        title={
          invoice
            ? (isReadOnly ? 'عرض الفاتورة ' : 'تعديل مسودة ') + invoice.number
            : 'فاتورة ' + '\u0645\u0628\u064A\u0639\u0627\u062A' + ' جديدة'
        }
        description="رأس الفاتورة، البنود، ثم ملخص الإجماليات."
        extra={
          <div className="flex gap-2">
            <Button variant="outline" onClick={close}>
              <ArrowRight />
              قائمة الفواتير
            </Button>
            {isReadOnly && (
              <Button variant="outline" onClick={onNew}>
                فاتورة جديدة
              </Button>
            )}
          </div>
        }
      />
      <InvoiceLookup kind={'sale'} onSelect={handleLoadInvoice} />
      <DocumentNavigator
        index={
          invoice
            ? s.invoices
                .filter((invoice) => invoice.kind === 'sale' && invoice.branchId === branchId)
                .findIndex((v) => v.id === invoice.id)
            : -1
        }
        count={
          s.invoices.filter((invoice) => invoice.kind === 'sale' && invoice.branchId === branchId)
            .length
        }
        onChange={(i) =>
          handleLoadInvoice(
            s.invoices.filter(
              (invoice) => invoice.kind === 'sale' && invoice.branchId === branchId,
            )[i],
          )
        }
        onList={close}
      />
      {isReadOnly && (
        <div className="info-note">
          فاتورة نهائية — بياناتها محملة في الشاشة للعرض، ولا يمكن تغيير أثرها المحاسبي.
        </div>
      )}
      <fieldset disabled={isReadOnly} className="invoice-data-fields">
        <section className="panel form-panel">
          <h2>بيانات الفاتورة</h2>
          <div className="form-grid four">
            <Field
              label={
                '\u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u064A\u0644' +
                (d.payment === 'cash' ? '' : ' *')
              }
            >
              <Input
                list="invoice-parties"
                value={partySearch}
                placeholder="اختر الطرف…"
                onChange={(e) => {
                  setPartySearch(e.target.value);
                  const p = s.parties.find(
                    (party) =>
                      party.kind === 'customer' &&
                      (party.name === e.target.value || party.phone === e.target.value),
                  );
                  setD({ ...d, partyId: p?.id || '', priceType: p?.priceType || d.priceType });
                }}
              />
              <datalist id="invoice-parties">
                {s.parties
                  .filter((party) => party.kind === 'customer' && party.active)
                  .map((party) => (
                    <option key={party.id} value={party.name}>
                      {party.phone}
                    </option>
                  ))}
              </datalist>
              {party && (
                <Button type="button" variant="outline" onClick={() => setBalanceOpen(true)}>
                  إجمالي الرصيد
                </Button>
              )}
            </Field>
            <Field label="تاريخ الفاتورة *">
              <Input
                type="date"
                required
                value={d.date}
                onChange={(e) => setD({ ...d, date: e.target.value })}
              />
            </Field>
            <Field label="الفرع">
              <div className="input-readonly">
                {s.branches.find((branch) => branch.id === d.branchId)?.name}
              </div>
            </Field>
            <Field label="المخزن *">
              <Select
                value={d.warehouseId}
                onChange={(e) => setD({ ...d, warehouseId: e.target.value })}
              >
                {s.warehouses
                  .filter((warehouse) => warehouse.branchId === d.branchId && warehouse.active)
                  .map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
              </Select>
            </Field>
            <Field label="رقم الهاتف">
              <Input readOnly value={party?.phone || ''} />
            </Field>
            <Field label="نوع الدفع">
              <Select
                value={d.payment}
                onChange={(e) => {
                  setPaidInput(null);
                  setD({ ...d, payment: e.target.value as 'cash' | 'credit' | 'mixed' });
                }}
              >
                <option value="cash">نقدي كامل</option>
                <option value="credit">آجل كامل</option>
                <option value="mixed">جزء نقدي وجزء آجل</option>
              </Select>
            </Field>
            {systemSettings(s).accounting.taxEnabled && (
              <Field label="نسبة الضريبة %">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step=".01"
                  value={d.taxRate}
                  onChange={(e) => setD({ ...d, taxRate: +e.target.value })}
                />
              </Field>
            )}
            <Field label="نوع السعر">
              <Select
                disabled={false}
                value={d.priceType}
                onChange={(e) => {
                  const priceType = e.target.value as 'retail' | 'wholesale';
                  setD({ ...d, priceType });
                  setLines(
                    lines.map((invoiceLine) => ({
                      ...invoiceLine,
                      price: +(
                        s.products.find((product) => product.id === invoiceLine.productId)!.units[
                          invoiceLine.unit
                        ][priceType] / d.rate
                      ).toFixed(4),
                    })),
                  );
                }}
              >
                <option value="retail">تجزئة</option>
                <option value="wholesale">جملة</option>
              </Select>
            </Field>
            <Field label="صندوق العملية — بالعملة الأساسية">
              <Select
                value={d.cashId}
                disabled={d.payment === 'credit'}
                onChange={(e) => setD({ ...d, cashId: e.target.value })}
              >
                {cashOptions(s, branchId)
                  .filter((c) => c.active && c.currency === s.organization.currency)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} · YER
                    </option>
                  ))}
              </Select>
            </Field>
            {false}
            <Field label="عملة الفاتورة">
              <Select
                value={d.currency}
                onChange={(e) => {
                  const c = s.currencies.find((c) => c.code === e.target.value)!;
                  setLines(
                    lines.map((invoiceLine) => ({
                      ...invoiceLine,
                      price: +((invoiceLine.price * d.rate) / c.rate).toFixed(4),
                    })),
                  );
                  setPaidInput((v) => (v === null ? null : money((v * d.rate) / c.rate)));
                  setD({
                    ...d,
                    currency: c.code,
                    rate: c.rate,
                    paid: money((d.paid * d.rate) / c.rate),
                    invoiceDiscount: money((d.invoiceDiscount * d.rate) / c.rate),
                  });
                }}
              >
                {s.currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="سعر الصرف إلى YER">
              <Input
                disabled={d.currency === 'YER'}
                type="number"
                min="0.000001"
                step="any"
                value={d.rate}
                onChange={(e) => setD({ ...d, rate: +e.target.value })}
              />
            </Field>
          </div>
          {d.currency !== 'YER' && (
            <p className="info-note">
              أسعار الصرف بيانات تجريبية وليست أسعار سوق. راجع المعدل التاريخي قبل الحفظ.
            </p>
          )}
        </section>
        <InvoiceLineGrid
          state={s}
          lines={lines}
          onChange={setLines}
          kind={'sale'}
          priceType={d.priceType}
          rate={d.rate}
          currency={d.currency}
          warehouseId={d.warehouseId}
          isReadOnly={isReadOnly}
          onAddProduct={() => setAddProduct(true)}
          onPendingChange={setGridPending}
        />
        {isGridPending && (
          <p className="field-error" role="alert">
            اختر الصنف في صف البحث بالضغط على Enter، أو امسح البحث قبل حفظ الفاتورة.
          </p>
        )}
        <section className="panel invoice-footer">
          <div>
            <Field label="ملاحظات">
              <Input
                value={d.note}
                onChange={(e) => setD({ ...d, note: e.target.value })}
                placeholder="ملاحظة اختيارية تظهر مع المستند"
              />
            </Field>
            <p className="muted text-xs mt-4">
              المسودة بلا أثر. الحفظ النهائي يثبت الفاتورة والمخزون والقيد معًا. لا يمكن تعديل
              المستند النهائي.
            </p>
          </div>
          <div>
            <div className="form-grid">
              <Field label="خصم الأصناف">
                <Input
                  type="number"
                  min="0"
                  max={summary.gross}
                  step=".01"
                  value={summary.lineDiscount}
                  onChange={(e) => changeItemDiscount(+e.target.value)}
                />
              </Field>
              <Field label={'الخصم المسموح به'}>
                <Input
                  type="number"
                  min="0"
                  max={Math.max(0, summary.gross - summary.lineDiscount)}
                  step=".01"
                  value={d.invoiceDiscount}
                  onChange={(e) => setD({ ...d, invoiceDiscount: +e.target.value })}
                />
              </Field>
              <Field label="المبلغ المدفوع">
                <Input
                  required
                  type="number"
                  min="0"
                  max={summary.net}
                  step=".01"
                  value={paidInput ?? summary.paid}
                  onChange={(e) => changePaid(+e.target.value)}
                />
              </Field>
            </div>
            {itemDiscountError && (
              <p role="alert" className="field-error">
                {itemDiscountError}
              </p>
            )}
            <InvoiceTotals
              lines={lines}
              payment={d.payment}
              paid={d.paid}
              taxRate={d.taxRate}
              invoiceDiscount={d.invoiceDiscount}
              currency={d.currency}
            />
          </div>
        </section>
      </fieldset>
      <div className="editor-actions">
        {!isReadOnly && (
          <>
            <Button disabled={isBusy || !lines.length} onClick={() => save('final')}>
              <Save size={17} />
              {isBusy ? 'جارٍ الحفظ…' : 'حفظ نهائي'}
            </Button>
            <Button
              variant="outline"
              disabled={isBusy || !lines.length}
              onClick={() => save('draft')}
            >
              حفظ مسودة
            </Button>
          </>
        )}
        {isReadOnly && (
          <Button variant="outline" onClick={() => printReport(invoiceReport(s, invoice!))}>
            طباعة الفاتورة
          </Button>
        )}
        <Button variant="ghost" onClick={close}>
          تراجع
        </Button>
      </div>
      <Modal
        isOpen={isBalanceOpen}
        title="رصيد الطرف"
        description="رصيد حالي للفرع من قيود الذمم المحفوظة، وليس إجمالي جميع العملات الأصلية."
        onClose={() => setBalanceOpen(false)}
      >
        <DataTable
          headers={['العملة', 'مدين', 'دائن', 'الرصيد', 'الحالة']}
          rows={(() => {
            const ls = s.entries
              .filter((entry) => entry.branchId === d.branchId)
              .flatMap((entry) => entry.lines)
              .filter(
                (journalLine) => journalLine.partyId === d.partyId && journalLine.account === '130',
              );
            const dr = ls.reduce((n, journalLine) => n + journalLine.debit, 0);
            const cr = ls.reduce((n, journalLine) => n + journalLine.credit, 0);
            return [['YER', fmt(dr), fmt(cr), fmt(Math.abs(dr - cr)), dr >= cr ? 'مدين' : 'دائن']];
          })()}
        />
      </Modal>
      {isAddProduct && <ProductEditor product={null} onClose={() => setAddProduct(false)} />}
    </div>
  );
}
