import type { VoucherDueContext } from '@/features/accounting/vouchers/types/read-models/VoucherDueContext';
// Frontend display calculations; backend authority requires independent verification.
import { money } from '@/core/utils/money';
export function voucherDue(
  workspace: VoucherDueContext,
  kind: 'receipt' | 'payment',
  branchId: string,
  partyId: string,
  date: string,
) {
  return money(
    workspace.entries
      .filter((entry) => entry.branchId === branchId && entry.date <= date)
      .flatMap((entry) => entry.lines)
      .filter(
        (journalLine) =>
          journalLine.account === (kind === 'receipt' ? '130' : '210') &&
          journalLine.partyId === partyId,
      )
      .reduce(
        (n, journalLine) =>
          n + (kind === 'receipt' ? 1 : -1) * (journalLine.debit - journalLine.credit),
        0,
      ),
  );
}
