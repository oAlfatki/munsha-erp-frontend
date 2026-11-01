import { Modal } from '@/shared/ui/dialogs/Modal';
import { TotalsFooter } from '@/shared/ui/documents/TotalsFooter';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form } from '@/shared/ui/forms/ValidatedForm';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { fmt } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { useVoucherDetailsController } from '@/features/accounting/hooks/useVoucherDetailsController';
import { useVoucherEditorController } from '@/features/accounting/hooks/useVoucherEditorController';
import type { VoucherDetailsProps } from '@/features/accounting/types/VoucherDetailsProps';
import type { VoucherEditorProps } from '@/features/accounting/types/VoucherEditorProps';
import {
  operationCashId,
  systemSettings,
} from '@/features/settings/services/models/system-settings';
import { Plus, Trash2 } from 'lucide-react';

export function VoucherEditor({
  kind: initialKind,
  partyId = '',
  onClose: close,
}: VoucherEditorProps) {
  const model = useVoucherEditorController({ kind: initialKind, partyId, onClose: close });
  if (!model) return null;
  const {
    s,
    branchId,
    isBusy,
    voucherMutation,
    kind,
    setKind,
    party,
    setParty,
    date,
    setDate,
    note,
    setNote,
    blank,
    lines,
    setLines,
    update,
    cash,
    due,
    total,
    totals,
  } = model;
  return (
    <Modal
      isOpen
      title={kind === 'receipt' ? 'إضافة سند قبض' : 'إضافة سند صرف'}
      description="سند واحد بعدة مبالغ وعملات، مع صندوق وسعر صرف لكل بند. تسوى الذمة بالعملة الأساسية."
      onClose={close}
      isWide
    >
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          if (
            await voucherMutation.execute({
              kind,
              partyId: party,
              date,
              branchId,
              note,
              lines: lines.map((l) => ({
                amount: Number(l.amount),
                currency: l.currency,
                rate: l.rate,
                cashId: l.cashId,
              })),
            })
          )
            close();
        }}
      >
        <div className="form-grid">
          <Field label="اسم الحساب / الطرف *">
            <Select required value={party} onChange={(e) => setParty(e.target.value)}>
              <option value="">اختر الطرف</option>
              {s.parties
                .filter(
                  (party) =>
                    party.active && party.kind === (kind === 'receipt' ? 'customer' : 'supplier'),
                )
                .map((party) => (
                  <option key={party.id} value={party.id}>
                    {party.name}
                  </option>
                ))}
            </Select>
          </Field>
          <Field label="تاريخ السند *">
            <Input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="نوع السند">
            <Select
              value={kind}
              onChange={(e) => {
                const k = e.target.value as 'receipt' | 'payment';
                setKind(k);
                setParty('');
                setLines((v) =>
                  v.map((l) => ({ ...l, cashId: operationCashId(s, branchId, k, l.currency) })),
                );
              }}
            >
              <option value="receipt">قبض من عميل</option>
              <option value="payment">صرف لمورد</option>
            </Select>
          </Field>
          <Field label="البيان">
            <Input
              required={systemSettings(s).expenses.requireVoucherNote}
              value={note}
              maxLength={400}
              onChange={(e) => setNote(e.target.value)}
            />
          </Field>
        </div>
        <div className="form-section-title">
          <h3>مبالغ السند</h3>
          <Button
            type="button"
            variant="outline"
            disabled={lines.length >= 30}
            onClick={() => setLines([...lines, blank()])}
          >
            <Plus size={16} />
            إضافة مبلغ
          </Button>
        </div>
        <div className="table-scroll">
          <table className="data-table voucher-entry-grid">
            <thead>
              <tr>
                <th>المبلغ</th>
                <th>العملة</th>
                <th>سعر الصرف إلى {s.organization.currency}</th>
                <th>الصندوق / البنك</th>
                <th>المقابل {s.organization.currency}</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l, i) => (
                <tr key={l.key}>
                  <td>
                    <Field label={'مبلغ البند ' + (i + 1) + ' *'}>
                      <Input
                        required
                        autoFocus={i === 0}
                        type="number"
                        min=".01"
                        step=".01"
                        value={l.amount}
                        onChange={(e) => update(i, { amount: e.target.value })}
                      />
                    </Field>
                  </td>
                  <td>
                    <Field label={'عملة البند ' + (i + 1) + ' *'}>
                      <Select
                        required
                        value={l.currency}
                        onChange={(e) => {
                          const currency = e.target.value,
                            c = s.currencies.find((c) => c.code === currency)!;
                          update(i, {
                            currency,
                            rate: c.rate,
                            cashId: operationCashId(s, branchId, kind, currency),
                          });
                        }}
                      >
                        {s.currencies
                          .filter(
                            (c) =>
                              systemSettings(s).accounting.multiCurrency ||
                              c.code === s.organization.currency,
                          )
                          .map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.name} — {c.code}
                            </option>
                          ))}
                      </Select>
                    </Field>
                  </td>
                  <td>
                    <Field label={'سعر صرف البند ' + (i + 1) + ' *'}>
                      <Input
                        required
                        type="number"
                        min=".000001"
                        step="any"
                        disabled={l.currency === s.organization.currency}
                        value={l.rate}
                        onChange={(e) => update(i, { rate: +e.target.value })}
                      />
                    </Field>
                  </td>
                  <td>
                    <Field label={'صندوق البند ' + (i + 1) + ' *'}>
                      <Select
                        required
                        value={l.cashId}
                        onChange={(e) => update(i, { cashId: e.target.value })}
                      >
                        <option value="">اختر الصندوق</option>
                        {cash
                          .filter((c) => c.active && c.currency === l.currency)
                          .map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} · {c.currency}
                            </option>
                          ))}
                      </Select>
                    </Field>
                    {!cash.some((c) => c.active && c.currency === l.currency) && (
                      <small className="field-error">
                        لا يوجد صندوق نشط بهذه العملة في الفرع؛ أضفه من الصناديق والبنوك.
                      </small>
                    )}
                  </td>
                  <td className="numeric strong">{fmt(money(Number(l.amount || 0) * l.rate))}</td>
                  <td>
                    <Button
                      type="button"
                      variant="ghost"
                      aria-label={'حذف مبلغ ' + (i + 1)}
                      disabled={lines.length === 1}
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
        {total > due && party && (
          <p className="field-error" role="alert">
            إجمالي السند بالعملة الأساسية يتجاوز الرصيد المستحق.
          </p>
        )}
        <TotalsFooter
          rows={[
            ['رصيد الذمة قبل السند ' + s.organization.currency, Math.max(due, 0)],
            ...[...totals].map(([c, a]) => ['إجمالي ' + c, a] as [string, number]),
            ['إجمالي السند ' + s.organization.currency, total],
            ['متبقي الذمة ' + s.organization.currency, Math.max(0, money(due - total))],
          ]}
          amount={total}
          currency={s.organization.currency}
        />
        <p className="info-note">
          تجمع العملات المختلفة بعد تحويل كل بند بسعره المحفوظ، ولا يجمع المبلغ الأصلي لعملتين في
          إجمالي واحد. السند لتسوية ذمة قائمة، ولا يعيد إثبات المبيعات أو المشتريات.
        </p>
        <div className="dialog-actions">
          <Button disabled={isBusy}>حفظ نهائي</Button>
          <Button type="button" variant="outline" onClick={close}>
            تراجع
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export function VoucherDetails({ document: d }: VoucherDetailsProps) {
  const model = useVoucherDetailsController({ document: d });
  if (!model) return null;
  const { s, report } = model;
  return (
    <>
      <dl className="confirm-grid">
        <dt>رقم السند</dt>
        <dd>{d.reference}</dd>
        <dt>الطرف</dt>
        <dd>{s.parties.find((party) => party.id === d.partyId)?.name}</dd>
        <dt>التاريخ</dt>
        <dd>{d.date}</dd>
        <dt>البيان</dt>
        <dd>{d.note || '—'}</dd>
      </dl>
      <DataTable
        headers={report.tables[0].headers}
        rows={report.tables[0].rows.map((r) => r.map((v) => (typeof v === 'number' ? fmt(v) : v)))}
      />
      <TotalsFooter
        rows={report.totals.map(([k, v]) => [k, Number(v)])}
        amount={d.total}
        currency={s.organization.currency}
      />
    </>
  );
}
