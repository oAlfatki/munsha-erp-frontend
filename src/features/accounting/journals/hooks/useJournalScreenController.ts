import { today } from '@/core/utils/formatters';
import { useManualJournal } from '@/features/accounting/journals/hooks/useManualJournal';
import { useJournalScreenControllerQuery } from '@/features/accounting/journals/queries/useJournalScreenControllerQuery';
import { manualJournalSchema } from '@/features/ledger/public';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';
import { useState } from 'react';

export function useJournalScreenController() {

  const { state, branchId, busy: isBusy, navigate } = useJournalScreenControllerQuery();
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
  if (!state) return null;
  const dr = lines.reduce((n, l) => n + l.debit, 0);
  const cr = lines.reduce((n, l) => n + l.credit, 0);

  const update = (i: number, k: string, v: string | number) =>
    setLines(lines.map((l, j) => (j === i ? { ...l, [k]: v } : l)));

  return {
    s: state,
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
