import { Modal } from '@/shared/ui/dialogs/Modal';
import { Pill } from '@/shared/ui/display/Pill';
import { TotalsFooter } from '@/shared/ui/documents/TotalsFooter';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form, validateForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { useErpContext } from '@/core/hooks/useErpContext';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { exportDocument, printReport } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { allAccounts } from '@/features/accounting/services/models/extensions';
import { fiscalRange } from '@/features/accounting/services/models/fiscal-range';
import { useStockDocument } from '@/features/inventory/hooks/useStockDocument';
import type { OpeningAccountLine } from '@/features/inventory/types/models/OpeningAccountLine';
import type { StockDocument } from '@/features/inventory/types/models/StockDocument';
import { stockDocumentSchema } from '@/features/inventory/validation/inventory-schema';
import { stockDocumentReport } from '@/features/reports/services/models/report-documents';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
export function OpeningAccounts() {
  const { state: s, branchId, busy: isBusy, navigate } = useErpContext();
  const stockDocumentMutationRequest = useStockDocument(),
    stockDocumentForm = useValidatedForm(stockDocumentSchema, stockDocumentMutationRequest.execute),
    stockDocumentMutation = { ...stockDocumentMutationRequest, execute: stockDocumentForm.submit };
  const [date, setDate] = useState(fiscalRange(s!).from),
    [currency, setCurrency] = useState('YER'),
    [rate, setRate] = useState(1),
    [note, setNote] = useState(''),
    [lines, setLines] = useState<OpeningAccountLine[]>([
      { account: '', partyId: '', debit: 0, credit: 0, description: '' },
    ]),
    [selected, setSelected] = useState<StockDocument | null>(null),
    [isConfirm, setConfirm] = useState(false),
    [isList, setList] = useState(false);
  if (!s) return null;
  const chart = allAccounts(s),
    docs = (s.stockDocuments || []).filter(
      (d) =>
        d.kind === 'opening' &&
        d.branchId === branchId &&
        (d.openingScope === 'accounts' || d.accounts.length > 0),
    );
  const isReadOnly = selected?.status === 'final' || (!!selected && selected.lines.length > 0),
    dr = money(lines.reduce((n, l) => n + l.debit * rate, 0)),
    cr = money(lines.reduce((n, l) => n + l.credit * rate, 0));
  const handleReset = () => {
    setSelected(null);
    setDate(fiscalRange(s).from);
    setCurrency('YER');
    setRate(1);
    setNote('');
    setLines([{ account: '', partyId: '', debit: 0, credit: 0, description: '' }]);
    setList(false);
  };
  const load = (d: StockDocument) => {
    setSelected(d);
    setDate(d.date);
    setCurrency(d.currency);
    setRate(d.rate);
    setNote(d.note);
    setLines(structuredClone(d.accounts));
    setList(false);
  };
  const update = (i: number, patch: Partial<OpeningAccountLine>) =>
    setLines(lines.map((l, j) => (i === j ? { ...l, ...patch } : l)));
  const save = async (status: 'draft' | 'final') => {
    if (
      await stockDocumentMutation.execute({
        id: selected?.id,
        kind: 'opening',
        openingScope: 'accounts',
        status,
        date,
        branchId,
        warehouseId: '',
        toWarehouseId: '',
        currency,
        rate,
        direction: 'shortage',
        note,
        lines: [],
        accounts: lines,
      })
    ) {
      setConfirm(false);
      handleReset();
      setList(true);
    }
  };
  return (
    <>
      <PageHead
        title="إضافة الأرصدة الافتتاحية"
        description="أرصدة الحسابات والذمم فقط، دون أصناف أو مخازن."
        extra={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              جديد
            </Button>
            <Button variant="outline" onClick={() => setList(!isList)}>
              {isList ? 'إدخال الأرصدة' : 'المستندات المحفوظة'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/accounting/opening-report')}>
              تقرير الأرصدة الافتتاحية
            </Button>
          </div>
        }
      />
      {isList ? (
        <DataTable
          headers={['الرقم', 'التاريخ', 'عدد الحسابات', 'المدين YER', 'الحالة', 'عرض']}
          rows={docs.map((d) => [
            d.reference,
            d.date,
            d.accounts.length,
            fmt(d.accounts.reduce((n, l) => n + l.debit * d.rate, 0)),
            d.status === 'final' ? 'نهائي' : 'مسودة',
            <Button size="sm" variant="ghost" onClick={() => load(d)}>
              عرض
            </Button>,
          ])}
        />
      ) : (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setConfirm(true);
          }}
        >
          <section className="panel form-panel">
            <Pill>
              {selected?.reference || 'جديد'} · {isReadOnly ? 'عرض فقط' : 'إدخال'}
            </Pill>
            <div className="form-grid four">
              <Field label="تاريخ الأرصدة الافتتاحية *">
                <Input
                  type="date"
                  disabled={isReadOnly}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Field>
              <Field label="العملة *">
                <Select
                  disabled={isReadOnly || lines.some((l) => l.debit || l.credit)}
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    setRate(s.currencies.find((c) => c.code === e.target.value)!.rate);
                  }}
                >
                  {s.currencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="سعر الصرف *">
                <Input
                  type="number"
                  min="0.000001"
                  step="any"
                  disabled={isReadOnly || currency === 'YER'}
                  value={rate}
                  onChange={(e) => setRate(+e.target.value)}
                />
              </Field>
              <Field label="البيان / مرجع الأرصدة">
                <Input
                  disabled={isReadOnly}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Field>
            </div>
            <div className="table-scroll">
              <table className="data-table line-table">
                <thead>
                  <tr>
                    <th>الحساب</th>
                    <th>الطرف</th>
                    <th>مدين {currency}</th>
                    <th>دائن {currency}</th>
                    <th>البيان</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l, i) => (
                    <tr key={i}>
                      <td>
                        <Field label={'الحساب ' + (i + 1) + ' *'}>
                          <Select
                            disabled={isReadOnly}
                            value={l.account}
                            onChange={(e) => update(i, { account: e.target.value, partyId: '' })}
                          >
                            <option value="">اختر الحساب</option>
                            {Object.entries(chart)
                              .filter(
                                ([code, a]) =>
                                  ![
                                    '120',
                                    '140',
                                    '150',
                                    '160',
                                    '170',
                                    '179',
                                    '220',
                                    '230',
                                  ].includes(code) && !['revenue', 'expense'].includes(a.type),
                              )
                              .map(([code, a]) => (
                                <option key={code} value={code}>
                                  {a.name} — {code}
                                </option>
                              ))}
                          </Select>
                        </Field>
                      </td>
                      <td>
                        <Field label={['130', '210'].includes(l.account) ? 'الطرف *' : 'الطرف'}>
                          <Select
                            disabled={isReadOnly || !['130', '210'].includes(l.account)}
                            value={l.partyId}
                            onChange={(e) => update(i, { partyId: e.target.value })}
                          >
                            <option value="">اختر الطرف</option>
                            {s.parties
                              .filter(
                                (party) =>
                                  party.active &&
                                  party.kind === (l.account === '130' ? 'customer' : 'supplier'),
                              )
                              .map((party) => (
                                <option key={party.id} value={party.id}>
                                  {party.name}
                                </option>
                              ))}
                          </Select>
                        </Field>
                      </td>
                      {(['debit', 'credit'] as const).map((k) => (
                        <td key={k}>
                          <Field label={(k === 'debit' ? 'مدين ' : 'دائن ') + (i + 1)}>
                            <Input
                              type="number"
                              min="0"
                              step="any"
                              required
                              disabled={isReadOnly}
                              value={l[k]}
                              onChange={(e) => update(i, { [k]: +e.target.value })}
                            />
                          </Field>
                        </td>
                      ))}
                      <td>
                        <Input
                          aria-label={'بيان الحساب ' + (i + 1)}
                          disabled={isReadOnly}
                          value={l.description}
                          onChange={(e) => update(i, { description: e.target.value })}
                        />
                      </td>
                      <td>
                        <Button
                          type="button"
                          variant="ghost"
                          disabled={isReadOnly}
                          onClick={() => setLines(lines.filter((unusedValue, j) => i !== j))}
                        >
                          <Trash2 size={15} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!isReadOnly && (
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setLines([
                    ...lines,
                    { account: '', partyId: '', debit: 0, credit: 0, description: '' },
                  ])
                }
              >
                <Plus size={16} />
                إضافة حساب
              </Button>
            )}
            <p className="info-note">
              يتطلب الحفظ النهائي توازن المدين والدائن. أدخل المخزون من «أصناف بداية المدة» في قسم
              المخازن والأصناف؛ لا تضف قيمته مرة أخرى هنا.
            </p>
          </section>
          <TotalsFooter
            rows={[
              ['عدد الحسابات', lines.length],
              ['إجمالي مدين YER', dr],
              ['إجمالي دائن YER', cr],
              ['الفرق', money(dr - cr)],
            ]}
            amount={dr}
          />
          {dr !== cr && (
            <p role="alert" className="field-error">
              الأرصدة غير متزنة؛ راجع المدين والدائن قبل الحفظ النهائي.
            </p>
          )}
          <div className="editor-actions">
            {!isReadOnly && (
              <>
                <Button type="submit" disabled={isBusy || !lines.length || dr !== cr || !dr}>
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
              onClick={() => (selected ? load(selected) : handleReset())}
            >
              تراجع
            </Button>
            {selected && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    printReport(
                      stockDocumentReport(s, {
                        ...selected,
                        lines: [],
                        total: dr,
                        openingScope: 'accounts',
                      }),
                    )
                  }
                >
                  طباعة
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    exportDocument(
                      stockDocumentReport(s, {
                        ...selected,
                        lines: [],
                        total: dr,
                        openingScope: 'accounts',
                      }),
                    )
                  }
                >
                  تصدير
                </Button>
              </>
            )}
          </div>
        </Form>
      )}
      <Modal
        isOpen={isConfirm}
        title="اعتماد الأرصدة الافتتاحية للحسابات"
        description="ينشئ قيد أرصدة الحسابات فقط، دون كميات أصناف أو حركات مخزنية."
        onClose={() => setConfirm(false)}
      >
        <TotalsFooter
          rows={[
            ['مدين YER', dr],
            ['دائن YER', cr],
          ]}
          amount={dr}
        />
        <div className="dialog-actions">
          <Button disabled={isBusy} onClick={() => save('final')}>
            تأكيد الحفظ النهائي
          </Button>
          <Button variant="outline" onClick={() => setConfirm(false)}>
            تراجع
          </Button>
        </div>
      </Modal>
    </>
  );
}
