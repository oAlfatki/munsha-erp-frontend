import { useErpContext } from '@/core/hooks/useErpContext';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { today } from '@/core/utils/formatters';
import { extras } from '@/features/accounting/services/models/extensions';
import { useSalesTarget } from '@/features/sales/hooks/useSalesTarget';
import { salesTargetSchema } from '@/features/sales/validation/sales-schema';
import { tradeSummary } from '@/features/trade/services/models/trade-summary';
import { useState } from 'react';
export function useSalesTargetsController() {
  const { state: s, branchId, busy: isBusy } = useErpContext();
  const salesTargetMutationRequest = useSalesTarget(),
    salesTargetForm = useValidatedForm(salesTargetSchema, salesTargetMutationRequest.execute),
    salesTargetMutation = { ...salesTargetMutationRequest, execute: salesTargetForm.submit };
  const [period, setPeriod] = useState(
      today().startsWith(String(s!.organization.year))
        ? today().slice(0, 7)
        : s!.organization.year + '-01',
    ),
    [employee, setEmployee] = useState(''),
    [amount, setAmount] = useState(0),
    [note, setNote] = useState('');
  if (!s) return null;
  const targets = (extras(s).records.salesTargets || []).filter((t) => t.branchId === branchId);
  const rows = targets.map((t) => {
    const from = t.period + '-01',
      end = new Date(Date.UTC(+String(t.period).slice(0, 4), +String(t.period).slice(5), 0))
        .toISOString()
        .slice(0, 10),
      actual = tradeSummary(s, 'sale', branchId, { from, to: end, warehouse: '' }).total || 0;
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
    s.employees.find((e) => e.id === t.employee)?.name || 'غير محدد',
    Number(t.amount),
    actual,
    remaining,
    percent,
  ]);
  return {
    s,
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
