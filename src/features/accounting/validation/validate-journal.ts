import { money } from '@/core/utils/money';
import type { ValidateJournalContext } from '@/features/accounting/types/read-models/ValidateJournalContext';
import { manualJournalSchema } from '@/features/ledger/public/accounting-schema';
import { allAccounts, extras } from '@/features/ledger/public/extensions';
export function validateJournal(data: ValidateJournalContext, input: unknown) {
  const p = manualJournalSchema.parse(input),
    chart = allAccounts(data),
    records = extras(data).records;
  if (!data.branches.some((branch) => branch.id === p.branchId)) throw Error('راجع السنة والفرع');
  for (const line of p.lines) {
    if ((records.contacts || []).some((contact) => contact.account === line.account))
      throw Error('استخدم مستند الطرف المتنوع لحسابه الرقابي');
    if (
      !chart[line.account] ||
      ['120', '130', '140', '150', '160', '170', '179', '165', '240', '210', '220', '230'].includes(
        line.account,
      )
    )
      throw Error('الحساب الرقابي يُحدث من مستنده، وليس بقيد يدوي');
    const custom = records.accounts?.find((account) => account.code === line.account);
    if (custom && (!custom.active || custom.postable !== 'yes'))
      throw Error('الحساب غير فعال أو تجميعي غير قابل للقيد');
    if (line.debit > 0 === line.credit > 0) throw Error('كل سطر مدين أو دائن فقط');
  }
  const debit = money(p.lines.reduce((sum, line) => sum + line.debit, 0)),
    credit = money(p.lines.reduce((sum, line) => sum + line.credit, 0));
  if (debit <= 0 || debit !== credit) throw Error('القيد يجب أن يكون متزنًا وغير صفري');
}
