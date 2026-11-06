import { today } from '@/core/utils/formatters';
import { extras } from '@/features/ledger/public';
import { salesTargetSchema } from '@/features/sales/invoices/validations/sales-schema';
import { useSalesTarget } from '@/features/sales/targets/hooks/useSalesTarget';
import { useSalesTargetsControllerQuery } from '@/features/sales/targets/queries/useSalesTargetsControllerQuery';
import { tradeSummary } from '@/features/trade/public';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';
import { useState } from 'react';

export function useSalesTargetsController() {

  const { state, branchId, busy: isBusy } = useSalesTargetsControllerQuery();
  const salesTargetMutationRequest = useSalesTarget(),
    salesTargetForm = useValidatedForm(salesTargetSchema, salesTargetMutationRequest.execute),
    salesTargetMutation = { ...salesTargetMutationRequest, execute: salesTargetForm.submit };
  const [period, setPeriod] = useState(
      today().startsWith(String(state!.organization.year))
        ? today().slice(0, 7)
        : state!.organization.year + '-01',
    ),
    [employee, setEmployee] = useState(''),
    [amount, setAmount] = useState(0),
    [note, setNote] = useState('');
  if (!state) return null;
  const targets = (extras(state).records.salesTargets || []).filter((t) => t.branchId === branchId);
  const rows = targets.map((t) => {
    const from = t.period + '-01',
      end = new Date(Date.UTC(+String(t.period).slice(0, 4), +String(t.period).slice(5), 0))
        .toISOString()
        .slice(0, 10),
      actual = tradeSummary(state, 'sale', branchId, { from, to: end, warehouse: '' }).total || 0;
    return {
      t,
      actual,
      remaining: Number(t.amount) - actual,
      percent: (actual / Number(t.amount)) * 100,
    };
  });
  const headers = [
    'الفترة',
    'المسؤول',
    'هدف الفرع YER',
    'صافي مبيعات الفرع YER',
    'المتبقي',
    'نسبة الإنجاز %',
  ];
  const csvRows = rows.map(({ t, actual, remaining, percent }) => [
    String(t.period),
    state.employees.find((e) => e.id === t.employee)?.name || 'غير محدد',
    Number(t.amount),
    actual,
    remaining,
    percent,
  ]);
  return {
    s: state,
    branchId,
    isBusy,
    salesTargetMutation,
    period,
    setPeriod,
    employee,
    setEmployee,
    amount,
    setAmount,
    note,
    setNote,
    rows,
    headers,
    csvRows,
  };
}
