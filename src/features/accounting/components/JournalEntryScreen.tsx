import { ROUTES } from '@/core/config/navigation-paths';
import { fmt } from '@/core/utils/formatters';
import { useJournalScreenController } from '@/features/accounting/hooks/useJournalScreenController';
import type { JournalScreenProps } from '@/features/accounting/types/JournalScreenProps';
import { allAccounts } from '@/features/ledger/public/extensions';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { Form as ValidatedForm } from '@/shared/ui/forms/ValidatedForm';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';

export function JournalScreen({ screen }: JournalScreenProps) {
  const model = useJournalScreenController();
  if (!model) return null;
  const {
    s,
    branchId,
    isBusy,
    navigate,
    manualJournalMutation,
    date,
    setDate,
    note,
    setNote,
    lines,
    setLines,
    dr,
    cr,
    update,
  } = model;
  return (
    <>
      <PageHead
        title={screen.title}
        description={screen.note!}
        extra={
          <Button variant="outline" onClick={() => navigate(ROUTES.ACCOUNTING)}>
            قائمة القيود
            <ArrowLeft size={16} />
          </Button>
        }
      />
      <ValidatedForm
        className="panel form-panel"
        onSubmit={async (e) => {
          e.preventDefault();
          if (await manualJournalMutation.execute({ date, branchId, note, lines })) {
            setNote('');
            setLines([
              { account: '', debit: 0, credit: 0 },
              { account: '', debit: 0, credit: 0 },
            ]);
          }
        }}
      >
        <div className="form-grid">
          <Field label="تاريخ القيد *">
            <Input required type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="البيان *">
            <Input required value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </div>
        <div className="table-scroll">
          <table className="data-table journal-editor">
            <thead>
              <tr>
                <th>الحساب</th>
                <th>مدين YER</th>
                <th>دائن YER</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l, i) => (
                <tr key={i}>
                  <td>
                    <Select
                      required
                      value={l.account}
                      onChange={(e) => update(i, 'account', e.target.value)}
                    >
                      <option value="">اختر حسابًا غير رقابي</option>
                      {Object.entries(allAccounts(s))
                        .filter(
                          ([c]) =>
                            ![
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
                            ].includes(c),
                        )
                        .map(([c, a]) => (
                          <option key={c} value={c}>
                            {a.name} · {c}
                          </option>
                        ))}
                    </Select>
                  </td>
                  <td>
                    <Input
                      type="number"
                      min="0"
                      step=".01"
                      value={l.debit}
                      onChange={(e) => update(i, 'debit', +e.target.value)}
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      min="0"
                      step=".01"
                      value={l.credit}
                      onChange={(e) => update(i, 'credit', +e.target.value)}
                    />
                  </td>
                  <td>
                    <Button
                      aria-label="حذف سطر القيد"
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={lines.length <= 2}
                      onClick={() => setLines(lines.filter((unusedValue, j) => j !== i))}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button
          className="mt-4"
          type="button"
          variant="outline"
          onClick={() => setLines([...lines, { account: '', debit: 0, credit: 0 }])}
        >
          <Plus size={16} />
          إضافة سطر
        </Button>
        <div className="document-stats">
          <div>
            <span>إجمالي مدين</span>
            <strong>{fmt(dr)}</strong>
          </div>
          <div>
            <span>إجمالي دائن</span>
            <strong>{fmt(cr)}</strong>
          </div>
          <div>
            <span>الفرق</span>
            <strong>{fmt(dr - cr)}</strong>
          </div>
        </div>
        <div className="dialog-actions">
          <Button disabled={isBusy || Math.abs(dr - cr) > 0.001 || dr === 0}>
            <Save size={16} />
            حفظ القيد النهائي
          </Button>
        </div>
      </ValidatedForm>
    </>
  );
}
