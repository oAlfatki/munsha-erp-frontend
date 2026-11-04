import { ROUTES } from '@/core/config/navigation-paths';





import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { fmt,today } from '@/core/utils/formatters';
import { money } from '@/core/utils/money';
import { cashOptions,defaultCashId } from "@/features/accounting/public/cash";
import { extras } from "@/features/accounting/public/extensions";
import { fiscalRange } from "@/features/accounting/public/fiscal-range";
import { useExpenseConsume } from '@/features/expenses/hooks/useExpenseConsume';
import { useExpensePayment } from '@/features/expenses/hooks/useExpensePayment';
import { useExpenseSave } from '@/features/expenses/hooks/useExpenseSave';
import { useExpenseControllerQuery } from '@/features/expenses/queries/useExpenseControllerQuery';
import {
expenseForeignDue,
expenseForeignPaid,
expenseViews,
TREATMENT_LABELS,
} from '@/features/expenses/services/models/expenses';
import type { IExpenseEditorInput } from '@/features/expenses/types/IExpenseEditorInput';
import type { ExpenseView } from '@/features/expenses/types/models/ExpenseView';
import {
expenseConsumeSchema,
expensePaymentSchema,
expenseSaveSchema,
} from '@/features/expenses/validation/expenses-schema';
import {
operationCashId,
systemSettings,
} from "@/features/settings/public/system-settings";
import { useState } from 'react';
export function useExpenseController(mode: 'add' | 'list' | 'report' = 'list') {
  const { state: s, branchId, busy: isBusy, navigate } = useExpenseControllerQuery();
  const expenseSaveMutationRequest = useExpenseSave(),
    expenseSaveForm = useValidatedForm(expenseSaveSchema, expenseSaveMutationRequest.execute),
    expenseSaveMutation = { ...expenseSaveMutationRequest, execute: expenseSaveForm.submit };
  const expensePaymentMutationRequest = useExpensePayment(),
    expensePaymentForm = useValidatedForm(
      expensePaymentSchema,
      expensePaymentMutationRequest.execute,
    ),
    expensePaymentMutation = {
      ...expensePaymentMutationRequest,
      execute: expensePaymentForm.submit,
    };
  const expenseConsumeMutationRequest = useExpenseConsume(),
    expenseConsumeForm = useValidatedForm(
      expenseConsumeSchema,
      expenseConsumeMutationRequest.execute,
    ),
    expenseConsumeMutation = {
      ...expenseConsumeMutationRequest,
      execute: expenseConsumeForm.submit,
    };
  const actions: Record<string, (input: unknown) => Promise<boolean>> = {
    expenseSave: expenseSaveMutation.execute,
    expensePayment: expensePaymentMutation.execute,
    expenseConsume: expenseConsumeMutation.execute,
  };
  const send = (type: string, data: unknown) => {
    const action = actions[type];
    if (!action) throw Error('Unsupported screen command: ' + type);
    return action(data);
  };
  const fiscalDate = today().startsWith(String(s!.organization.year))
    ? today()
    : s!.organization.year + '-01-01';
  const blank = (): IExpenseEditorInput => ({
    currency: systemSettings(s!).expenses.currency,
    rate: s!.currencies.find((c) => c.code === systemSettings(s!).expenses.currency)?.rate || 1,
    cashId: operationCashId(s!, branchId, 'expense', systemSettings(s!).expenses.currency),
    date: fiscalDate,
    typeId: '',
    treatment: 'current',
    description: '',
    amount: 0,
    start: fiscalDate,
    end: fiscalDate,
    paid: 0,
    branchId,
  });
  const [edit, setEdit] = useState<IExpenseEditorInput | null>(mode === 'add' ? blank() : null),
    [searchQuery, setQ] = useState(''),
    [treatment, setTreatment] = useState(''),
    [selected, setSelected] = useState<ExpenseView | null>(null),
    [action, setAction] = useState<{
      id: string;
      kind: 'payment' | 'consume';
    } | null>(null),
    [amount, setAmount] = useState(0),
    [date, setDate] = useState(fiscalDate),
    [period, setPeriod] = useState(fiscalDate.slice(0, 7)),
    [payment, setPayment] = useState('unpaid'),
    [from, setFrom] = useState(fiscalRange(s!).from),
    [to, setTo] = useState(fiscalRange(s!).to),
    [typeId, setTypeId] = useState(''),
    [reportBranch, setReportBranch] = useState(branchId),
    [paymentCash, setPaymentCash] = useState('');
  if (!s) return null;
  const types = extras(s).records.expenseTypes || [],
    all = expenseViews(s),
    rows = all.filter(
      (d) =>
        d.branchId === branchId &&
        (!treatment || d.treatment === treatment) &&
        (
          d.description +
          ' ' +
          d.reference +
          ' ' +
          (types.find((t) => t.id === d.typeId)?.name || d.typeId)
        ).includes(searchQuery),
    );
  const typeName = (id: string) =>
      types.find((t) => t.id === id)?.name || (id === 'legacy' ? 'مصروف سابق' : id),
    formOld = edit?.id ? all.find((d) => d.id === edit.id) : undefined,
    isLocked =
      !!formOld &&
      (!!formOld.legacy ||
        !!formOld.carriedFrom ||
        formOld.payments.length > 0 ||
        formOld.settlements.length > 0);
  const close = () => {
    setEdit(null);
    if (mode === 'add') navigate(ROUTES.EXPENSES_EXPENSE_LIST);
  };
  const editRow = (d: ExpenseView) => {
    setSelected(null);
    setEdit({
      id: d.id,
      date: d.date,
      branchId: d.branchId,
      typeId: d.typeId,
      treatment: d.treatment,
      description: d.description,
      amount: d.foreignAmount ?? d.amount,
      currency: d.currency || s.organization.currency,
      rate: d.rate || 1,
      cashId: d.cashId || defaultCashId(d.branchId),
      start: d.start,
      end: d.end,
      paid: expenseForeignPaid(d),
    });
    setPayment(d.paid >= d.amount ? 'paid' : d.paid > 0 ? 'partial' : 'unpaid');
  };
  const openAction = (d: ExpenseView, kind: 'payment' | 'consume') => {
    setAction({ id: d.id, kind });
    setDate(fiscalDate);
    setPeriod(fiscalDate.slice(0, 7));
    setAmount(kind === 'payment' ? expenseForeignDue(d) : d.remaining);
    setPaymentCash(d.cashId || defaultCashId(d.branchId));
  };
  const cashName = (id: string | undefined, b: string) =>
    cashOptions(s, b).find((c) => c.id === (id || defaultCashId(b)))?.name || 'صندوق سابق';
  const actionDoc = all.find((d) => d.id === action?.id),
    actionCurrency = actionDoc?.currency || s.organization.currency;
  const entries = all.filter(
    (d) =>
      (!reportBranch || d.branchId === reportBranch) &&
      d.date <= to &&
      (!typeId || d.typeId === typeId),
  );
  const reportRows = entries.map((d) => {
    const ps = d.payments.filter((p) => p.date <= to).reduce((n, p) => n + p.amount, 0),
      cs = d.settlements.filter((p) => p.date <= to).reduce((n, p) => n + p.amount, 0);
    const paid = d.legacy
      ? d.legacy === 'cash' || d.legacy === 'prepaidExpense'
        ? d.amount
        : ps
      : ps;
    const refs =
      d.legacy === 'cash'
        ? [d.reference]
        : d.legacy
          ? [d.reference, ...d.settlements.map((p) => p.reference)]
          : [...d.recognitionRefs, ...d.settlements.map((p) => p.reference)];
    const recognized = s.entries
      .filter(
        (entry) =>
          entry.branchId === d.branchId &&
          (!from || entry.date >= from) &&
          entry.date <= to &&
          (refs.includes(entry.reference) ||
            entry.reference.startsWith(d.reference + '-R-') ||
            entry.description === 'عكس لتصحيح ' + d.reference),
      )
      .flatMap((entry) => entry.lines)
      .filter((journalLine) => journalLine.account === d.account)
      .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0);
    return [
      d.reference,
      typeName(d.typeId),
      TREATMENT_LABELS[d.treatment],
      fmt(money(recognized)),
      fmt(money(d.amount - paid)),
      fmt(d.treatment === 'prepaid' ? money(paid - cs) : 0),
    ];
  });
  return {
    s,
    branchId,
    send,
    busy: isBusy,
    navigate,
    fiscalDate,
    blank,
    edit,
    setEdit,
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
    payment,
    setPayment,
    from,
    setFrom,
    to,
    setTo,
    typeId,
    setTypeId,
    reportBranch,
    setReportBranch,
    paymentCash,
    setPaymentCash,
    types,
    all,
    rows,
    typeName,
    formOld,
    locked: isLocked,
    close,
    editRow,
    openAction,
    cashName,
    actionDoc,
    actionCurrency,
    entries,
    reportRows,
  };
}
