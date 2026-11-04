




import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { exportDocument,exportPdf,printReport } from '@/core/reporting/service';
import { fmt,today } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { allAccounts } from "@/features/accounting/public/extensions";
import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { useDeleteStockDraft } from '@/features/inventory/hooks/useDeleteStockDraft';
import { useStockDocument } from "@/features/inventory/public/useStockDocument";
import { useStockDocumentsQuery } from '@/features/inventory/queries/useStockDocumentsQuery';
import { stockDocumentReport } from "@/features/inventory/public/build-stock-document";
import type { StockDocument } from "@/features/inventory/public/types/models/StockDocument";
import type { StockDocumentLine } from '@/features/inventory/types/models/StockDocumentLine';
import type { StockDocumentsProps } from '@/features/inventory/types/StockDocumentsProps';
import {
deleteStockDraftSchema,
stockDocumentSchema,
} from "@/features/inventory/public/inventory-schema";
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { DocumentNavigator } from '@/shared/ui/documents/DocumentNavigator';
import { TotalsFooter } from '@/shared/ui/documents/TotalsFooter';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm,validateForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Download,List,Plus,Printer,Save,Search,Trash2 } from 'lucide-react';
import { useEffect,useState } from 'react';
import { toast } from 'sonner';
export function StockDocuments({ kind }: StockDocumentsProps) {
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
