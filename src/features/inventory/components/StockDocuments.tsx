import { exportDocument, printReport } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { useStockDocumentsController } from '@/features/inventory/hooks/useStockDocumentsController';
import type { StockDocumentsProps } from '@/features/inventory/types/StockDocumentsProps';
import { allAccounts } from '@/features/ledger/public/extensions';
import { stockDocumentReport } from '@/features/stock/public/build-stock-document';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { DocumentNavigator } from '@/shared/ui/documents/DocumentNavigator';
import { TotalsFooter } from '@/shared/ui/documents/TotalsFooter';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm, validateForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Download, List, Plus, Printer, Save, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
export function StockDocuments({ kind }: StockDocumentsProps) {
  const model = useStockDocumentsController({ kind });
  if (!model) return null;
  const {
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
  } = model;
  return (
    <ValidatedForm
      onSubmit={(e) => {
        e.preventDefault();
        setConfirm(true);
      }}
    >
      <PageHead
        title={title}
        description={
          kind === 'opening'
            ? 'كميات وتكاليف الأصناف عند بداية المدة للمخزن المختار.'
            : 'رأس المستند، البنود، ثم الإجماليات. الحفظ النهائي يثبت الأثر مرة واحدة.'
        }
        extra={
          <div className="report-toolbar">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (isDirty) {
                  toast.info('احفظ المسودة أو تراجع قبل فتح القائمة.');
                  return;
                }
                setListMode(!isListMode);
              }}
            >
              <List size={16} />
              {isListMode ? 'نموذج المستند' : 'قائمة المستندات'}
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              <Plus size={16} />
              جديد
            </Button>
            <Button type="button" variant="outline" onClick={() => printReport()}>
              <Printer size={16} />
              طباعة
            </Button>
            <Button type="button" variant="outline" onClick={handleExportCurrent}>
              <Download size={16} />
              تصدير
            </Button>
          </div>
        }
      />
      <div className="invoice-lookup no-print">
        <Input
          aria-label="بحث مستند مخزني برقم الفاتورة"
          placeholder="ابحث برقم الفاتورة / المستند…"
          value={documentQuery}
          onChange={(e) => setDocumentQuery(e.target.value)}
        />
        <Button type="button" variant="outline" onClick={() => setSearchOpen(true)}>
          <Search size={16} />
          بحث المستندات
        </Button>
      </div>
      <Modal
        isOpen={isSearchOpen}
        title="البحث عن مستند مخزني"
        onClose={() => setSearchOpen(false)}
        isWide
      >
        <DataTable
          headers={['الرقم', 'التاريخ', 'الحالة', 'تحميل']}
          rows={docs
            .filter((d) => d.reference.toLowerCase().includes(documentQuery.toLowerCase()))
            .map((d) => [
              d.reference,
              d.date,
              d.status === 'final' ? 'نهائي' : 'مسودة',
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  if (
                    isDirty &&
                    !window.confirm('تحميل المستند يستبدل البيانات غير المحفوظة. متابعة؟')
                  )
                    return;
                  load(d);
                  setSearchOpen(false);
                }}
              >
                تحميل في الشاشة
              </Button>,
            ])}
        />
      </Modal>
      {isListMode ? (
        <>
          <DataTable
            headers={[
              'الرقم',
              'التاريخ',
              'عدد الأصناف',
              'القيمة YER',
              'الحالة',
              'عرض',
              'طباعة',
              'تصدير',
            ]}
            rows={docs.map((d) => [
              d.reference,
              d.date,
              new Set(d.lines.map((l) => l.productId)).size,
              fmt(d.total),
              <Pill tone={d.status === 'final' ? 'green' : 'amber'}>
                {d.status === 'final' ? 'نهائي' : 'مسودة'}
              </Pill>,
              <Button type="button" variant="ghost" size="sm" onClick={() => load(d)}>
                عرض
              </Button>,
              <Button
                type="button"
                aria-label={'طباعة ' + d.reference}
                size="sm"
                variant="ghost"
                onClick={() => {
                  load(d);
                  setPrintRequested(true);
                }}
              >
                <Printer size={15} />
              </Button>,
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => exportDocument(stockDocumentReport(s, d))}
              >
                <Download size={15} />
              </Button>,
            ])}
          />
          <p className="info-note">
            المستندات الجديدة متعددة البنود هنا؛ التحويلات القديمة تظهر أيضًا في تقرير التحويلات. لا
            يعاد تطبيق أثر المستند عند عرضه.
          </p>
        </>
      ) : (
        <>
          <DocumentNavigator
            index={selected ? docs.findIndex((d) => d.id === selected.id) : -1}
            count={docs.length}
            onChange={handleBrowse}
            isDisabled={isDirty}
            onList={() => setListMode(true)}
          />
          <section className="panel form-panel">
            <div className="form-section-title">
              <h2>بيانات المستند</h2>
              <Pill tone={isReadOnly ? 'green' : 'amber'}>
                {selected?.reference || 'جديد'} · {isReadOnly ? 'نهائي — عرض فقط' : 'مسودة / إدخال'}
              </Pill>
            </div>
            <div className="form-grid four">
              <Field label="تاريخ المستند *">
                <Input
                  type="date"
                  disabled={isReadOnly}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setDirty(true);
                  }}
                />
              </Field>
              <Field label={kind === 'transfer' ? 'من المخزن *' : 'المخزن *'}>
                <Select
                  disabled={isReadOnly || lines.length > 0}
                  value={wh}
                  onChange={(e) => {
                    setWarehouse(e.target.value);
                    setDirty(true);
                  }}
                >
                  {own.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
                </Select>
              </Field>
              {kind === 'transfer' && (
                <Field label="إلى المخزن *">
                  <Select
                    disabled={isReadOnly}
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                      setDirty(true);
                    }}
                  >
                    <option value="">اختر مخزن الاستلام</option>
                    {s.warehouses
                      .filter((warehouse) => warehouse.active && warehouse.id !== wh)
                      .map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name} —{' '}
                          {s.branches.find((branch) => branch.id === warehouse.branchId)?.name}
                        </option>
                      ))}
                  </Select>
                </Field>
              )}
              {kind === 'adjustment' && (
                <Field label="نوع التسوية *">
                  <Select
                    disabled={isReadOnly}
                    value={direction}
                    onChange={(e) => {
                      setDirection(e.target.value as 'shortage' | 'excess');
                      setDirty(true);
                    }}
                  >
                    <option value="shortage">تسوية بالعجز — إخراج</option>
                    <option value="excess">تسوية بالزيادة — إدخال</option>
                  </Select>
                </Field>
              )}
              <Field label="العملة">
                <Select
                  disabled={isReadOnly || kind !== 'opening' || lines.length > 0}
                  value={currency}
                  onChange={(e) => {
                    const c = s.currencies.find((c) => c.code === e.target.value)!;
                    setCurrency(c.code);
                    setRate(c.rate);
                    setDirty(true);
                  }}
                >
                  {s.currencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} — {c.code}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="سعر الصرف">
                <Input
                  required
                  type="number"
                  min=".000001"
                  step="any"
                  disabled={isReadOnly || currency === 'YER'}
                  value={rate}
                  onChange={(e) => {
                    setRate(+e.target.value);
                    setDirty(true);
                  }}
                />
              </Field>
              <Field label="الفرع">
                <div className="input-readonly">
                  {s.branches.find((branch) => branch.id === branchId)?.name}
                </div>
              </Field>
              {kind === 'opening' && (
                <Field label="الحساب المقابل لمخزون البداية *">
                  <Select
                    disabled={isReadOnly}
                    value={offset}
                    onChange={(e) => {
                      setOffset(e.target.value);
                      setDirty(true);
                    }}
                  >
                    <option value="">اختر حسابًا</option>
                    {Object.entries(allAccounts(s))
                      .filter(
                        ([code, a]) =>
                          a.type === 'equity' &&
                          (!s.extras?.records.accounts?.find((v) => v.code === code) ||
                            s.extras.records.accounts.find((v) => v.code === code)?.postable ===
                              'yes'),
                      )
                      .map(([code, a]) => (
                        <option key={code} value={code}>
                          {a.name} — {code}
                        </option>
                      ))}
                  </Select>
                </Field>
              )}
              <Field label="ملاحظات / سبب التسوية">
                <Input
                  disabled={isReadOnly}
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                    setDirty(true);
                  }}
                />
              </Field>
            </div>
          </section>
          {
            <section className="panel form-panel">
              <h2>{kind === 'opening' ? 'بنود مخزون البداية' : 'بنود المستند'}</h2>
              {!isReadOnly && (
                <div className="stock-item-search">
                  <Input
                    aria-label="بحث صنف للمستند المخزني"
                    placeholder="اسم الصنف أو الرمز أو الباركود…"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (match.length) add(match[0].id);
                      }
                    }}
                    value={searchQuery}
                    onChange={(e) => setQ(e.target.value)}
                  />
                  {searchQuery && (
                    <div className="stock-item-results">
                      {match.map((product) => (
                        <Button
                          type="button"
                          key={product.id}
                          variant="ghost"
                          onClick={() => add(product.id)}
                        >
                          {product.name} — {product.code}
                          <Plus size={15} />
                        </Button>
                      ))}
                      {!match.length && <p>الصنف غير موجود.</p>}
                    </div>
                  )}
                </div>
              )}
              <div className="table-scroll">
                <table className="data-table line-table">
                  <thead>
                    <tr>
                      <th>اسم الصنف</th>
                      <th>الوحدة</th>
                      <th>الكمية</th>
                      {kind === 'adjustment' && (
                        <>
                          <th>الرصيد الأساسي عند المراجعة</th>
                          <th>الرصيد المتوقع بعدها</th>
                        </>
                      )}
                      <th>
                        {kind === 'opening'
                          ? 'تكلفة الوحدة ' + currency
                          : 'تكلفة الوحدة الدفترية YER'}
                      </th>
                      <th>الإجمالي YER</th>
                      {!isReadOnly && <th>حذف</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map((l, i) => {
                      const product = s.products.find((product) => product.id === l.productId)!;
                      const qty = l.qty * product.units[l.unit].factor;
                      return (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>
                            <Select
                              disabled={isReadOnly}
                              value={l.unit}
                              onChange={(e) => update(i, 'unit', +e.target.value)}
                            >
                              {product.units.map((u, j) => (
                                <option key={j} value={j}>
                                  {u.name}
                                </option>
                              ))}
                            </Select>
                          </td>
                          <td>
                            <Input
                              aria-label={'كمية ' + product.name}
                              required
                              type="number"
                              min=".000001"
                              step="any"
                              disabled={isReadOnly}
                              value={l.qty}
                              onChange={(e) => update(i, 'qty', +e.target.value)}
                            />
                          </td>
                          {kind === 'adjustment' && (
                            <>
                              <td>{fmt(l.expectedQty || 0)}</td>
                              <td>
                                {fmt(
                                  (l.expectedQty || 0) + (direction === 'shortage' ? -qty : qty),
                                )}
                              </td>
                            </>
                          )}
                          <td>
                            {kind === 'opening' ? (
                              <Input
                                aria-label={'تكلفة ' + product.name}
                                required
                                type="number"
                                min=".01"
                                step="any"
                                disabled={isReadOnly}
                                value={l.price}
                                onChange={(e) => update(i, 'price', +e.target.value)}
                              />
                            ) : (
                              fmt(l.qty ? stockValue(l) / l.qty : 0)
                            )}
                          </td>
                          <td>{fmt(stockValue(l))}</td>
                          {!isReadOnly && (
                            <td>
                              <Button
                                type="button"
                                aria-label="حذف بند مخزني"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setLines(lines.filter((unusedValue, j) => j !== i));
                                  setDirty(true);
                                }}
                              >
                                <Trash2 size={15} />
                              </Button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {kind === 'adjustment' && !isReadOnly && (
                <Button
                  type="button"
                  className="mt-4"
                  variant="outline"
                  onClick={() => {
                    setLines(
                      lines.map((l) => ({
                        ...l,
                        expectedQty:
                          s.stocks.find((v) => v.productId === l.productId && v.warehouseId === wh)
                            ?.qty || 0,
                        value: undefined,
                      })),
                    );
                    setDirty(true);
                  }}
                >
                  تحديث الرصيد الدفتري للمراجعة
                </Button>
              )}
            </section>
          }
          <TotalsFooter
            rows={[
              ['عدد الأصناف', lines.length],
              ['إجمالي قيمة المستند YER', inventory],
            ]}
            amount={inventory}
          />

          <div className="editor-actions no-print">
            {!isReadOnly && (
              <>
                <Button
                  type="submit"
                  disabled={isBusy || !lines.length || (kind === 'opening' && isFinalizedBranch)}
                >
                  <Save size={16} />
                  مراجعة وحفظ نهائي
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isBusy}
                  onClick={(e) => {
                    const form = e.currentTarget.closest('form');
                    if (form && validateForm(form)) save('draft');
                  }}
                >
                  حفظ مسودة
                </Button>
              </>
            )}
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                selected ? load(selected) : handleReset();
              }}
            >
              تراجع
            </Button>
            {selected?.status === 'draft' && (
              <Button
                type="button"
                variant="destructive"
                disabled={isBusy}
                onClick={async () => {
                  if (await deleteStockDraftMutation.execute({ id: selected.id })) handleReset();
                }}
              >
                حذف المسودة
              </Button>
            )}
          </div>
        </>
      )}
      <Modal
        isOpen={isConfirm}
        title="اعتماد المستند النهائي"
        description="ينشئ أثر المستند المختار فقط، دون إضافة أرصدة حسابات أخرى. المستند النهائي للعرض فقط."
        onClose={() => setConfirm(false)}
      >
        <TotalsFooter
          rows={[
            ['عدد الأصناف', lines.length],
            ['القيمة YER', total],
            ...(kind === 'opening'
              ? [['الحساب المقابل', allAccounts(s)[offset]?.name || offset] as [string, string]]
              : []),
          ]}
          amount={total}
        />
        <div className="dialog-actions">
          <Button type="button" disabled={isBusy} onClick={() => save('final')}>
            تأكيد الحفظ النهائي
          </Button>
          <Button type="button" variant="outline" onClick={() => setConfirm(false)}>
            تراجع
          </Button>
        </div>
      </Modal>
    </ValidatedForm>
  );
}
