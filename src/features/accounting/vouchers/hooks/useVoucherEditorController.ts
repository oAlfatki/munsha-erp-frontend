import { today } from '@/core/utils/formatters';
import { newId } from '@/core/utils/id';
import { money } from '@/core/utils/money';
import type { InputLine } from '@/features/accounting/overview/types/InputLine';
import { useVoucher } from '@/features/accounting/vouchers/hooks/useVoucher';
import { useVoucherEditorControllerQuery } from '@/features/accounting/vouchers/queries/useVoucherEditorControllerQuery';
import { voucherDue } from '@/features/accounting/vouchers/services/models/vouchers';
import type { VoucherEditorProps } from '@/features/accounting/vouchers/types/props/VoucherEditorProps';
import { cashOptions, voucherSchema } from '@/features/ledger/public';
import { operationCashId } from '@/features/organization/public';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';
import { useState } from 'react';

export function useVoucherEditorController({
  kind: initialKind,
  partyId = '',
}: VoucherEditorProps) {

  const { state, branchId, busy: isBusy } = useVoucherEditorControllerQuery();
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
    currency: state!.organization.currency,
    rate: 1,
    cashId: operationCashId(state!, branchId, kind),
  });

  const [lines, setLines] = useState<InputLine[]>(() => [blank()]);
  if (!state) return null;

  const update = (index: number, patch: Partial<InputLine>) =>
    setLines(lines.map((l, i) => (i === index ? { ...l, ...patch } : l)));

  const cash = cashOptions(state, branchId);
  const due = voucherDue(state, kind, branchId, party, date);
  const total = money(lines.reduce((n, l) => n + money(Number(l.amount || 0) * l.rate), 0));
  const totals = new Map<string, number>();
  for (const l of lines)
    totals.set(l.currency, money((totals.get(l.currency) || 0) + Number(l.amount || 0)));
  return {
    s: state,
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
