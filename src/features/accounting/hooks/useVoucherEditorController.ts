




import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { today } from '@/core/utils/formatters';
import { newId } from '@/core/utils/id';
import { money } from '@/core/utils/money';
import { useVoucher } from '@/features/accounting/hooks/useVoucher';
import { useVoucherEditorControllerQuery } from '@/features/accounting/queries/useVoucherEditorControllerQuery';
import { cashOptions } from "@/features/accounting/public/cash";
import { voucherDue } from '@/features/accounting/services/models/vouchers';
import type { InputLine } from '@/features/accounting/types/InputLine';
import type { VoucherEditorProps } from '@/features/accounting/types/VoucherEditorProps';
import { voucherSchema } from "@/features/accounting/public/accounting-schema";
import { operationCashId } from "@/features/settings/public/system-settings";
import { useState } from 'react';
export function useVoucherEditorController({
  kind: initialKind,
  partyId = '',
}: VoucherEditorProps) {
  const { state: s, branchId, busy: isBusy } = useVoucherEditorControllerQuery();
  const voucherMutationRequest = useVoucher();
  const voucherForm = useValidatedForm(voucherSchema, voucherMutationRequest.execute);
  const voucherMutation = { ...voucherMutationRequest, execute: voucherForm.submit };
  const [kind, setKind] = useState(initialKind);
  const [party, setParty] = useState(partyId);
  const [date, setDate] = useState(today());
  const [note, setNote] = useState('');
  const blank = (): InputLine => ({
    key: newId(),
    amount: '',
    currency: s!.organization.currency,
    rate: 1,
    cashId: operationCashId(s!, branchId, kind),
  });
  const [lines, setLines] = useState<InputLine[]>(() => [blank()]);
  if (!s) return null;
  const update = (index: number, patch: Partial<InputLine>) =>
    setLines(lines.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  const cash = cashOptions(s, branchId);
  const due = voucherDue(s, kind, branchId, party, date);
  const total = money(lines.reduce((n, l) => n + money(Number(l.amount || 0) * l.rate), 0));
  const totals = new Map<string, number>();
  for (const l of lines)
    totals.set(l.currency, money((totals.get(l.currency) || 0) + Number(l.amount || 0)));
  return {
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
  };
}
