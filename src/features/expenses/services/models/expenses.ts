import type {ExpenseViewsContext} from '@/features/expenses/types/read-models/ExpenseViewsContext';
import type { ExpenseDocument } from '@/features/expenses/types/models/ExpenseDocument';
import type { ExpenseView } from '@/features/expenses/types/models/ExpenseView';
// Frontend read models and display helpers. Authoritative mutations live in server/core.
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { money } from '@/core/utils/money';
import { extras } from '@/features/accounting/services/models/extensions';
import { z } from 'zod';
export const TREATMENT_LABELS = {
  current: 'مصروف حالي',
  accrued: 'مصروف مستحق',
  prepaid: 'مصروف مدفوع مقدمًا',
};
export function expenseViews(workspace: ExpenseViewsContext): ExpenseView[] {
  const x = extras(workspace);
  const docs: ExpenseDocument[] = [...(workspace.expenseDocuments || [])];
  const result = docs.map((d) => ({
    ...d,
    paid: money(d.payments.reduce((n, p) => n + p.amount, 0)),
    consumed: money(d.settlements.reduce((n, p) => n + p.amount, 0)),
  }));
  const legacy: typeof result = [];
  for (const expense of workspace.expenses)
    legacy.push({
      id: expense.id,
      reference: 'EXP-' + String(workspace.expenses.indexOf(expense) + 1).padStart(4, '0'),
      date: expense.date,
      branchId: expense.branchId,
      typeId: expense.category,
      account: '510',
      treatment: 'current',
      description: expense.description,
      amount: money(expense.amount * expense.rate),
      start: expense.date,
      end: expense.date,
      payments: [],
      settlements: [],
      recognitionRefs: [],
      paid: money(expense.amount * expense.rate),
      consumed: 0,
      legacy: 'cash',
    } as (typeof result)[number]);
  for (const o of x.operations.filter((o) =>
    ['accruedExpense', 'prepaidExpense'].includes(o.kind),
  )) {
    const isPrepaid = o.kind === 'prepaidExpense';
    const pay = x.operations.filter((v) => v.kind === 'settleExpense' && v.source === o.id);
    const consume = x.operations.filter((v) => v.kind === 'consumePrepaid' && v.source === o.id);
    legacy.push({
      id: o.id,
      reference: o.reference,
      date: o.date,
      branchId: o.branchId,
      typeId: 'legacy',
      account: '510',
      treatment: isPrepaid ? 'prepaid' : 'accrued',
      description: o.note || o.subject,
      amount: o.amount,
      start: o.date,
      end: o.date,
      payments: pay.map((p) => ({ reference: p.reference, date: p.date, amount: p.amount })),
      settlements: consume.map((p) => ({
        reference: p.reference,
        date: p.date,
        period: p.period!,
        amount: p.amount,
      })),
      recognitionRefs: [],
      paid: isPrepaid || o.paid ? o.amount : 0,
      consumed: money(consume.reduce((n, v) => n + v.amount, 0)),
      legacy: o.kind,
    } as (typeof result)[number]);
  }
  return [...result, ...legacy].map((d) => ({
    ...d,
    due: money(d.amount - d.paid),
    remaining: d.treatment === 'prepaid' ? money(d.paid - d.consumed) : 0,
  }));
}
export const expenseForeignPaid = (d: ExpenseView) =>
  money(
    d.legacy
      ? d.paid / (d.rate || 1)
      : d.payments.reduce((n, p) => n + (p.foreignAmount ?? p.amount / (d.rate || 1)), 0),
  );
export const expenseForeignDue = (d: ExpenseView) =>
  money((d.foreignAmount ?? d.amount) - expenseForeignPaid(d));
z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((v) => !isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v);
z.string().trim().min(1).max(300);
z.number().finite().positive();
