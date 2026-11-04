




import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { today } from '@/core/utils/formatters';
import { useManualJournal } from '@/features/accounting/hooks/useManualJournal';
import { useJournalScreenControllerQuery } from '@/features/accounting/queries/useJournalScreenControllerQuery';
import { manualJournalSchema } from "@/features/accounting/public/accounting-schema";
import { useState } from 'react';
export function useJournalScreenController() {
  const { state: s, branchId, busy: isBusy, navigate } = useJournalScreenControllerQuery();
  const manualJournalMutationRequest = useManualJournal();
  const manualJournalForm = useValidatedForm(
    manualJournalSchema,
    manualJournalMutationRequest.execute,
  );
  const manualJournalMutation = {
    ...manualJournalMutationRequest,
    execute: manualJournalForm.submit,
  };
  const [date, setDate] = useState(today());
  const [note, setNote] = useState('');
  const [lines, setLines] = useState([
    { account: '', debit: 0, credit: 0 },
    { account: '', debit: 0, credit: 0 },
  ]);
  if (!s) return null;
  const dr = lines.reduce((n, l) => n + l.debit, 0);
  const cr = lines.reduce((n, l) => n + l.credit, 0);
  const update = (i: number, k: string, v: string | number) =>
    setLines(lines.map((l, j) => (j === i ? { ...l, [k]: v } : l)));
  return {
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
  };
}
