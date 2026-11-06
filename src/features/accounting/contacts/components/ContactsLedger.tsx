import { ROUTES } from '@/core/config/navigation-paths';

import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { exportPdf } from '@/core/reporting/service';
import { fmt, today } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { useContactEntry } from '@/features/accounting/contacts/hooks/useContactEntry';
import { useContactVoucher } from '@/features/accounting/contacts/hooks/useContactVoucher';
import { useContactsLedgerQuery } from '@/features/accounting/contacts/queries/useContactsLedgerQuery';
import {
  allAccounts,
  cashOptions,
  contactEntrySchema,
  contactVoucherSchema,
  defaultCashId,
  extras,
  fiscalRange,
} from '@/features/ledger/public';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { AmountWords } from '@/shared/ui/documents/AmountWords';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { ReportActions } from '@/shared/ui/reports/ReportActions';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { useState } from 'react';
export function ContactsLedger() {
  const { state: s, branchId, busy: isBusy, navigate } = useContactsLedgerQuery();
  const contactEntryMutationRequest = useContactEntry(),
    contactEntryForm = useValidatedForm(contactEntrySchema, contactEntryMutationRequest.execute),
    contactEntryMutation = { ...contactEntryMutationRequest, execute: contactEntryForm.submit };
  const contactVoucherMutationRequest = useContactVoucher(),
    contactVoucherForm = useValidatedForm(
      contactVoucherSchema,
      contactVoucherMutationRequest.execute,
    ),
    contactVoucherMutation = {
      ...contactVoucherMutationRequest,
      execute: contactVoucherForm.submit,
    };
  const [id, setId] = useState(''),
    [from, setFrom] = useState(fiscalRange(s!).from),
    [to, setTo] = useState(fiscalRange(s!).to),
    [action, setAction] = useState<'entry' | 'voucher' | null>(null),
    [date, setDate] = useState(
      today().startsWith(String(s!.organization.year)) ? today() : s!.organization.year + '-01-01',
    ),
    [amount, setAmount] = useState(0),
    [counter, setCounter] = useState(''),
    [cashId, setCashId] = useState(defaultCashId(branchId)),
    [note, setNote] = useState('');
  if (!s) return null;
  const contacts = extras(s).records.contacts || [],
    contact = contacts.find((c) => c.id === id),
    chart = allAccounts(s);
  const entries = s.entries
    .filter(
      (entry) =>
        entry.branchId === branchId &&
        entry.lines.some(
          (journalLine) => journalLine.partyId === id && journalLine.account === contact?.account,
        ),
    )
    .slice()
    .sort((leftEntry, rightEntry) => leftEntry.date.localeCompare(rightEntry.date));
  const opening = money(
    entries
      .filter((entry) => from && entry.date < from)
      .flatMap((entry) => entry.lines)
      .filter(
        (journalLine) => journalLine.partyId === id && journalLine.account === contact?.account,
      )
      .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0),
  );
  let running = opening;
  const rows = entries
    .filter((entry) => (!from || entry.date >= from) && entry.date <= to)
    .map((entry) => {
      const ls = entry.lines.filter(
          (journalLine) => journalLine.partyId === id && journalLine.account === contact?.account,
        ),
        dr = money(ls.reduce((n, journalLine) => n + journalLine.debit, 0)),
        cr = money(ls.reduce((n, journalLine) => n + journalLine.credit, 0));
      running = money(running + dr - cr);
      return [entry.date, entry.reference, entry.description, dr, cr, running];
    });
  const headers = ['التاريخ', 'المستند', 'البيان', 'مدين YER', 'دائن YER', 'الرصيد YER'];
  return (
    <>
      <PageHead
        title="حركة الأطراف المتنوعة وكشف الحساب"
        description="إثبات الذمم وسدادها مع دفتر فرعي مستقل لكل طرف وفرع، بالعملة الأساسية."
        extra={<ReportActions onExport={() => exportPdf('كشف الطرف المتنوع', headers, rows)} />}
      />
      <div className="filter-bar">
        <Field label="الطرف">
          <Select value={id} onChange={(e) => setId(e.target.value)}>
            <option value="">اختر الطرف</option>
            {contacts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} · {c.kind === 'debtor' ? 'مدين' : 'دائن'}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="من تاريخ">
          <Input type="date" value={from} max={to} onChange={(e) => setFrom(e.target.value)} />
        </Field>
        <Field label="إلى تاريخ">
          <Input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} />
        </Field>
        <Button variant="outline" onClick={() => navigate(ROUTES.ACCOUNTING_CONTACTS)}>
          إضافة / قائمة الأطراف
        </Button>
      </div>
      <div className="document-stats">
        <div>
          <span>الرصيد السابق</span>
          <strong>{fmt(opening)}</strong>
        </div>
        <div>
          <span>الرصيد في نهاية العرض</span>
          <strong>{fmt(running)}</strong>
        </div>
        <div>
          <span>عدد الحركات</span>
          <strong>{rows.length}</strong>
        </div>
      </div>
      <DataTable
        headers={headers}
        rows={rows.map((r) => r.map((v) => (typeof v === 'number' ? fmt(v) : v)))}
      />
      <AmountWords amount={running} />
      <div className="dialog-actions">
        <Button
          disabled={!contact?.active}
          onClick={() => {
            setAction('entry');
            setAmount(0);
            setNote('');
          }}
        >
          إثبات ذمة
        </Button>
        <Button
          variant="outline"
          disabled={!contact?.active}
          onClick={() => {
            setAction('voucher');
            setAmount(0);
            setNote('');
          }}
        >
          {contact?.kind === 'creditor' ? 'سند صرف للطرف' : 'سند قبض من الطرف'}
        </Button>
      </div>
      <Modal
        isOpen={!!action}
        title={
          action === 'entry'
            ? 'إثبات ذمة متنوعة'
            : contact?.kind === 'creditor'
              ? 'سند صرف'
              : 'سند قبض'
        }
        onClose={() => setAction(null)}
        description="مستند نهائي متزن، مرتبط بالطرف والفرع. راجع الحساب المقابل قبل الحفظ."
      >
        <ValidatedForm
          onSubmit={async (e) => {
            e.preventDefault();
            if (
              await (
                action === 'entry' ? contactEntryMutation.execute : contactVoucherMutation.execute
              )({ contactId: id, branchId, date, amount, note, counterAccount: counter, cashId })
            ) {
              setAction(null);
            }
          }}
        >
          <div className="form-grid">
            <Field label="التاريخ">
              <Input required type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <Field label="المبلغ YER">
              <Input
                type="number"
                required
                min=".01"
                step=".01"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
              />
            </Field>
            {action === 'entry' ? (
              <Field label="الحساب المقابل *">
                <Select required value={counter} onChange={(e) => setCounter(e.target.value)}>
                  <option value="">اختر الحساب المناسب للعملية</option>
                  {Object.entries(chart)
                    .filter(
                      ([id]) =>
                        ![
                          '101',
                          '120',
                          '130',
                          '140',
                          '150',
                          '160',
                          '170',
                          '179',
                          '210',
                          '220',
                          '230',
                        ].includes(id) &&
                        !contacts.some((c) => c.account === id) &&
                        !cashOptions(s, branchId).some((c) => c.account === id),
                    )
                    .map(([id, a]) => (
                      <option key={id} value={id}>
                        {id} — {a.name}
                      </option>
                    ))}
                </Select>
              </Field>
            ) : (
              <Field label="الصندوق / البنك YER *">
                <Select required value={cashId} onChange={(e) => setCashId(e.target.value)}>
                  {cashOptions(s, branchId)
                    .filter((c) => c.active && c.currency === s.organization.currency)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </Select>
              </Field>
            )}
            <Field label="البيان *">
              <Input required value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>
          </div>
          <p className="info-note">
            {action === 'entry'
              ? contact?.kind === 'debtor'
                ? 'مدين حساب الطرف، دائن الحساب المقابل.'
                : 'مدين الحساب المقابل، دائن حساب الطرف.'
              : 'السداد لا يتجاوز الرصيد المستحق في الفرع؛ لا يثبت المصروف أو الإيراد مرة أخرى.'}
          </p>
          <div className="dialog-actions">
            <Button disabled={isBusy}>حفظ نهائي</Button>
            <Button type="button" variant="ghost" onClick={() => setAction(null)}>
              تراجع
            </Button>
          </div>
        </ValidatedForm>
      </Modal>
    </>
  );
}
