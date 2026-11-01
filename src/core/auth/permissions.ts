import type { PermissionsUserRole } from '@/core/types/PermissionsUserRole';

export function canRunCommand(role: PermissionsUserRole, type: string, data?: unknown) {
  if (role === 'admin') return true;
  if (role === 'viewer') return false;
  const p = data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
  if (type === 'stockDocument') return p.kind === 'transfer' || p.kind === 'adjustment';
  if (type === 'master')
    return ['units', 'productGroups', 'groups', 'expenseTypes', 'assets', 'contacts'].includes(
      String(p.collection),
    );
  return [
    'product',
    'party',
    'invoice',
    'deleteDraft',
    'return',
    'partialReturn',
    'priceList',
    'expense',
    'expenseSave',
    'expensePayment',
    'expenseConsume',
    'voucher',
    'transfer',
    'employee',
    'employeeDelete',
    'operation',
    'manualJournal',
    'salesTarget',
    'contactEntry',
    'contactVoucher',
  ].includes(type);
}
