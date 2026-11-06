import { fmt } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { ProductEditor } from '@/features/inventory/public';
import { cashOptions } from '@/features/ledger/public';
import { systemSettings } from '@/features/organization/public';
import { usePurchaseInvoiceEditor } from '@/features/purchases/invoices/hooks/usePurchaseInvoiceEditor';
import type { PurchaseInvoiceEditorProps } from '@/features/purchases/invoices/types/props/PurchaseInvoiceEditorProps';
import {
  InvoiceEditorActions,
  InvoiceLineGrid,
  InvoiceLookup,
  invoiceReport,
  InvoiceTotals,
} from '@/features/trade/public';
import { printReport } from '@/shared/services/report-actions';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { DocumentNavigator } from '@/shared/ui/documents/DocumentNavigator';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Save } from 'lucide-react';

export function PurchaseInvoiceEditor({
  invoice,
  onClose: close,
  onLoad,
  onNew,
}: PurchaseInvoiceEditorProps) {

  const model = usePurchaseInvoiceEditor({ invoice, onClose: close, onLoad });
  if (!model) return null;
  const {
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
  } = model;
  return (
    <div ref={validationRoot}>
      <PageHead
        title={
          invoice
            ? (isReadOnly ? 'عرض الفاتورة ' : 'تعديل مسودة ') + invoice.number
            : 'فاتورة ' + '\u0634\u0631\u0627\u0621' + ' جديدة'
        }
        description="رأس الفاتورة، البنود، ثم ملخص الإجماليات."
        extra={<InvoiceEditorActions onClose={close} onNew={onNew} isReadOnly={isReadOnly} />}
      />
      <InvoiceLookup kind={'purchase'} onSelect={handleLoadInvoice} />
      <DocumentNavigator
        index={
          invoice
            ? state.invoices
                .filter((invoice) => invoice.kind === 'purchase' && invoice.branchId === branchId)
                .findIndex((v) => v.id === invoice.id)
            : -1
        }
        count={
          state.invoices.filter(
            (invoice) => invoice.kind === 'purchase' && invoice.branchId === branchId,
          ).length
        }
        onChange={(i) =>
          handleLoadInvoice(
            state.invoices.filter(
              (invoice) => invoice.kind === 'purchase' && invoice.branchId === branchId,
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
                '\u0627\u0633\u0645 \u0627\u0644\u0645\u0648\u0631\u062F' +
                (d.payment === 'cash' ? '' : ' *')
              }
            >
              <Input
                list="invoice-parties"
                value={partySearch}
                placeholder="اختر الطرف…"
                onChange={(e) => {
                  setPartySearch(e.target.value);
                  const p = state.parties.find(
                    (party) =>
                      party.kind === 'supplier' &&
                      (party.name === e.target.value || party.phone === e.target.value),
                  );
                  setD({ ...d, partyId: p?.id || '', priceType: p?.priceType || d.priceType });
                }}
              />
              <datalist id="invoice-parties">
                {state.parties
                  .filter((party) => party.kind === 'supplier' && party.active)
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
                {state.branches.find((branch) => branch.id === d.branchId)?.name}
              </div>
            </Field>
            <Field label="المخزن *">
              <Select
                value={d.warehouseId}
                onChange={(e) => setD({ ...d, warehouseId: e.target.value })}
              >
                {state.warehouses
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
            {systemSettings(state).accounting.taxEnabled && (
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
                disabled={true}
                value={d.priceType}
                onChange={(e) => {
                  const priceType = e.target.value as 'retail' | 'wholesale';
                  setD({ ...d, priceType });
                  setLines(
                    lines.map((invoiceLine) => ({
                      ...invoiceLine,
                      price: +(
                        state.products.find((product) => product.id === invoiceLine.productId)!
                          .units[invoiceLine.unit][priceType] / d.rate
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
                {cashOptions(state, branchId)
                  .filter((c) => c.active && c.currency === state.organization.currency)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} · YER
                    </option>
                  ))}
              </Select>
            </Field>
            {
              <Field label="رقم فاتورة المورد">
                <Input
                  value={d.supplierNumber}
                  maxLength={100}
                  onChange={(e) => setD({ ...d, supplierNumber: e.target.value })}
                />
              </Field>
            }
            <Field label="عملة الفاتورة">
              <Select
                value={d.currency}
                onChange={(e) => {
                  const c = state.currencies.find((c) => c.code === e.target.value)!;
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
                {state.currencies.map((c) => (
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
          state={state}
          lines={lines}
          onChange={setLines}
          kind={'purchase'}
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
              <Field label={'الخصم المكتسب'}>
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
          <Button variant="outline" onClick={() => printReport(invoiceReport(state, invoice!))}>
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
            const ls = state.entries
              .filter((entry) => entry.branchId === d.branchId)
              .flatMap((entry) => entry.lines)
              .filter(
                (journalLine) => journalLine.partyId === d.partyId && journalLine.account === '210',
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
