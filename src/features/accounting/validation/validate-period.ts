import type {ValidatePeriodContext} from '@/features/accounting/types/read-models/ValidatePeriodContext';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { isArchived } from '@/features/accounting/services/models/annual-books';
export function validatePeriod(data: ValidatePeriodContext, type: string, input: unknown) {
  if (!type.startsWith('period') && isArchived(data))
    throw Error('الفترة مؤرشفة للعرض فقط؛ افتح الفترة الحالية من الإعدادات');
  if (!input || typeof input !== 'object') return;
  const value = input as Record<string, unknown>;
  if (
    [
      'invoice',
      'return',
      'expense',
      'transfer',
      'manualJournal',
      'operation',
      'voucher',
      'expenseSave',
      'expensePayment',
      'expenseConsume',
      'stockDocument',
    ].includes(type) &&
    typeof value.date === 'string'
  ) {
    const date = value.date;
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(Date.parse(date)) ||
      new Date(date).toISOString().slice(0, 10) !== date
    )
      throw Error('تاريخ غير صحيح');
    if (Number(date.slice(0, 4)) !== data.organization.year)
      throw Error('التاريخ خارج السنة المالية المفتوحة');
  }
}
