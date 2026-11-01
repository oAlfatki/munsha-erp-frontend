// Frontend read models and display helpers. Authoritative mutations live in server/core.
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { money } from '@/core/utils/money';
import { allAccounts, extras } from '@/features/accounting/services/models/extensions';
import type { JournalLine } from '@/features/accounting/types/models/JournalLine';
export const defaultCashId = (branch: string) => 'default-' + branch;
export function cashOptions(workspace: ErpReadModel, branchId: string) {
  return [
    {
      id: defaultCashId(branchId),
      name: 'الصندوق الرئيسي',
      currency: workspace.organization.currency,
      account: '101',
      branchId,
      active: true,
    },
    ...(extras(workspace).records.cash || [])
      .filter((c) => c.branchId === branchId)
      .map((c) => ({
        id: c.id,
        name: c.name,
        currency: String(c.currency),
        account: String(c.account || '101'),
        branchId,
        active: c.active,
      })),
  ];
}
export function requireCash(
  workspace: ErpReadModel,
  branchId: string,
  id: string,
  currency: string,
) {
  const c = cashOptions(workspace, branchId).find((c) => c.id === id && c.active),
    chart = allAccounts(workspace),
    custom = extras(workspace).records.accounts?.find((a) => a.code === c?.account);
  if (
    !c ||
    c.currency !== currency ||
    chart[c.account]?.type !== 'asset' ||
    ['120', '130', '140', '150', '160', '170', '179', '165'].includes(c.account) ||
    (custom && (!custom.active || custom.postable !== 'yes'))
  )
    throw Error('اختر صندوقًا نشطًا في الفرع وبعملة البند، مرتبطًا بحساب نقدي قابل للقيد');
  return c;
}
export const isCashLine = (workspace: ErpReadModel, branchId: string, journalLine: JournalLine) =>
  journalLine.account === '101' ||
  !!journalLine.cashId ||
  cashOptions(workspace, branchId).some((c) => c.account === journalLine.account);
export const cashLedgerBalance = (workspace: ErpReadModel, branchId: string) =>
  money(
    workspace.entries
      .filter((entry) => entry.branchId === branchId)
      .flatMap((entry) => entry.lines)
      .filter((journalLine) => isCashLine(workspace, branchId, journalLine))
      .reduce((n, journalLine) => n + journalLine.debit - journalLine.credit, 0),
  );
