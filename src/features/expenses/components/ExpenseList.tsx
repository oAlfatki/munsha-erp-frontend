import { ViewButton } from '@/core/components/shared/actions/ViewButton';
import { Modal } from '@/core/components/shared/dialogs/Modal';
import { Pill } from '@/core/components/shared/display/Pill';
import { SearchBox } from '@/core/components/shared/filters/SearchBox';
import { Field } from '@/core/components/shared/forms/Field';
import { Select } from '@/core/components/shared/forms/Select';
import { Form as ValidatedForm } from '@/core/components/shared/forms/ValidatedForm';
import { PageHead } from '@/core/components/shared/layout/PageHead';
import { ReportActions } from '@/core/components/shared/reports/ReportActions';
import { DataTable } from '@/core/components/shared/tables/DataTable';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { exportPdf } from '@/core/reporting/service';
import { fmt } from '@/core/utils/formatters';
import { cashOptions } from '@/features/accounting/services/models/cash';
import { TREATMENT_LABELS } from '@/features/expenses/services/models/expenses';
import type { ExpenseListProps } from '@/features/expenses/types/ExpenseListProps';
import { LABELS } from '@/features/expenses/utils/treatments';
export function ExpenseList({ controller }: ExpenseListProps) {
  const {
    s: workspace,
    branchId,
    send,
    busy: isBusy,
    navigate,
    q: searchQuery,
    setQ,
    treatment,
    setTreatment,
    selected,
    setSelected,
    action,
    setAction,
    amount,
    setAmount,
    date,
    setDate,
    period,
    setPeriod,
    from,
    to,
    paymentCash,
    setPaymentCash,
    rows,
    typeName,
    editRow,
    openAction,
    cashName,
    actionDoc,
    actionCurrency,
  } = controller;
  return (
    <>
      <PageHead
        title={'قائمة المصروفات'}
        description="مصروفات حالية ومستحقة ومقدمة في سجل موحد."
        onAction={() => navigate('/expenses/add')}
        label="إضافة مصروف"
        extra={
          <ReportActions
            onExport={() =>
              exportPdf(
                'المصروفات',
                [
                  'المستند',
                  'التاريخ',
                  'النوع',
                  'المعالجة',
                  'البيان',
                  'العملة',
                  'المبلغ بالعملة',
                  'الصندوق',
                  'المبلغ YER',
                  'المدفوع YER',
                  'المتبقي YER',
                ],
                rows.map((d) => [
                  d.reference,
                  d.date,
                  typeName(d.typeId),
                  TREATMENT_LABELS[d.treatment],
                  d.description,
                  d.currency || workspace.organization.currency,
                  d.foreignAmount ?? d.amount,
                  cashName(d.cashId, d.branchId),
                  d.amount,
                  d.paid,
                  d.due,
                ]),
                {
                  metadata: [
                    ['الفترة', from + ' — ' + to],
                    [
                      'الفرع',
                      workspace.branches.find((branch) => branch.id === branchId)?.name || '',
                    ],
                  ],
                },
              )
            }
          />
        }
      />
      {
        <>
          <div className="filter-bar">
            <SearchBox value={searchQuery} onChange={setQ} />
            <Select
              aria-label="فلترة معالجة المصروف"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
            >
              <option value="">الكل</option>
              {LABELS.map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </Select>
          </div>
          <DataTable
            headers={[
              'المستند',
              'التاريخ',
              'النوع',
              'المعالجة',
              'البيان',
              'العملة',
              'المبلغ بالعملة',
              'الصندوق',
              'المبلغ YER',
              'المدفوع YER',
              'المتبقي YER',
              'السداد',
              'عرض',
              'تعديل',
            ]}
            rows={rows.map((d) => [
              d.reference,
              d.date,
              typeName(d.typeId),
              TREATMENT_LABELS[d.treatment],
              d.description,
              d.currency || workspace.organization.currency,
              fmt(d.foreignAmount ?? d.amount),
              cashName(d.cashId, d.branchId),
              fmt(d.amount),
              fmt(d.paid),
              fmt(d.due),
              <Pill tone={d.due === 0 ? 'green' : 'amber'}>
                {d.due === 0 ? 'مسدد' : d.paid > 0 ? 'جزئي' : 'غير مسدد'}
              </Pill>,
              <ViewButton onClick={() => setSelected(d)} />,
              <Button size="sm" variant="ghost" onClick={() => editRow(d)}>
                تعديل
              </Button>,
            ])}
          />
        </>
      }
      {selected && (
        <Modal
          isOpen
          isWide
          title={'المصروف ' + selected.reference}
          onClose={() => setSelected(null)}
        >
          <DataTable
            headers={['البيان', 'القيمة']}
            rows={[
              ['العملة', selected.currency || workspace.organization.currency],
              ['المبلغ بالعملة', fmt(selected.foreignAmount ?? selected.amount)],
              ['سعر الصرف المثبت', selected.rate || 1],
              ['الصندوق', cashName(selected.cashId, selected.branchId)],
              ['الوصف', selected.description],
              ['المعالجة', TREATMENT_LABELS[selected.treatment]],
              ['المبلغ', fmt(selected.amount)],
              ['المدفوع', fmt(selected.paid)],
              ['المستحق', fmt(selected.due)],
              ['المقدم المتبقي', fmt(selected.remaining)],
            ]}
          />
          <h3>سندات الصرف والتسويات المرتبطة</h3>
          <DataTable
            headers={[
              'المستند',
              'التاريخ',
              'الفترة',
              'الصندوق',
              'المبلغ بالعملة',
              'العملة',
              'المبلغ YER',
            ]}
            rows={[
              ...selected.payments.map((p) => [
                p.reference,
                p.date,
                'سداد',
                cashName(p.cashId, selected.branchId),
                fmt(p.foreignAmount ?? p.amount),
                p.currency || workspace.organization.currency,
                fmt(p.amount),
              ]),
              ...selected.settlements.map((p) => [
                p.reference,
                p.date,
                p.period,
                '—',
                '—',
                workspace.organization.currency,
                fmt(p.amount),
              ]),
            ]}
          />
          <div className="dialog-actions">
            <Button onClick={() => editRow(selected)}>تعديل</Button>
            {selected.due > 0 && (
              <Button variant="outline" onClick={() => openAction(selected, 'payment')}>
                سند صرف
              </Button>
            )}
            {selected.treatment === 'prepaid' && selected.remaining > 0 && (
              <Button variant="outline" onClick={() => openAction(selected, 'consume')}>
                تسوية فترة
              </Button>
            )}
          </div>
        </Modal>
      )}
      {action && (
        <Modal
          isOpen
          title={
            action.kind === 'payment' ? 'سند صرف مرتبط بالمصروف' : 'تسوية دورية للمصروف المقدم'
          }
          onClose={() => setAction(null)}
        >
          <ValidatedForm
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                await send(action.kind === 'payment' ? 'expensePayment' : 'expenseConsume', {
                  id: action.id,
                  date,
                  amount,
                  note: actionDoc?.description || '',
                  ...(action.kind === 'consume'
                    ? { period }
                    : {
                        currency: actionCurrency,
                        rate: actionDoc?.rate || 1,
                        cashId: paymentCash,
                      }),
                })
              ) {
                setAction(null);
                setSelected(null);
              }
            }}
          >
            <div className="form-grid">
              <Field label="التاريخ">
                <Input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Field>
              {action.kind === 'consume' && (
                <Field label="الفترة">
                  <Input
                    required
                    type="month"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                  />
                </Field>
              )}
              {action.kind === 'payment' && (
                <>
                  <Field label="الصندوق / البنك *">
                    <Select
                      required
                      value={paymentCash}
                      onChange={(e) => setPaymentCash(e.target.value)}
                    >
                      <option value="">اختر الصندوق</option>
                      {cashOptions(workspace, actionDoc!.branchId)
                        .filter((c) => c.active && c.currency === actionCurrency)
                        .map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} · {c.currency}
                          </option>
                        ))}
                    </Select>
                  </Field>
                  <Field label="سعر الصرف المثبت">
                    <Input readOnly value={actionDoc?.rate || 1} />
                  </Field>
                </>
              )}
              <Field label={'المبلغ · ' + (action.kind === 'payment' ? actionCurrency : 'YER')}>
                <Input
                  required
                  type="number"
                  min=".01"
                  step=".01"
                  value={amount}
                  onChange={(e) => setAmount(+e.target.value)}
                />
              </Field>
            </div>
            <p className="info-note">
              {action.kind === 'payment'
                ? 'ينشئ سند صرف وقيدًا مرتبطين بالمصروف دون تكرار إثبات المصروف.'
                : 'مدين حساب المصروف ودائن المقدم؛ يمنع تجاوز المدفوع المتبقي وتكرار الفترة.'}
            </p>
            <div className="dialog-actions">
              <Button disabled={isBusy}>حفظ نهائي</Button>
              <Button type="button" variant="outline" onClick={() => setAction(null)}>
                تراجع
              </Button>
            </div>
          </ValidatedForm>
        </Modal>
      )}
    </>
  );
}
