import type {ValidatePolicyContext} from '@/features/settings/types/read-models/ValidatePolicyContext';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { systemSettings } from '@/features/settings/services/models/system-settings';
/** Pure existing policy checks extracted from the original rule reference. No writes occur here. */
export function validatePolicy(workspace: ValidatePolicyContext, type: string, raw: unknown) {
  if (!raw || typeof raw !== 'object') throw Error('طلب غير صحيح');
  const p = raw as Record<string, unknown>,
    v = systemSettings(workspace);
  if (type === 'invoice' && p.status === 'final') {
    if (
      p.payment !== 'cash' &&
      !(p.kind === 'sale' ? v.sales.allowCredit : v.purchases.allowCredit)
    )
      throw Error('العمليات الآجلة غير مسموحة وفق الإعدادات');
    if (!v.accounting.multiCurrency && p.currency !== workspace.organization.currency)
      throw Error('تعدد العملات غير مفعّل');
  }
  if (type === 'deleteDraft') {
    const d = workspace.invoices.find((invoice) => invoice.id === p.id);
    if (d && !(d.kind === 'sale' ? v.sales.allowDraftDelete : v.purchases.allowDraftDelete))
      throw Error('حذف مسودات هذا النوع غير مسموح وفق الإعدادات');
  }
  const isTransfer =
    type === 'transfer' ||
    (type === 'stockDocument' && p.kind === 'transfer' && p.status === 'final');
  if (isTransfer) {
    if (!v.inventory.allowTransfer) throw Error('التحويل المخزني غير مفعّل');
    const a = workspace.warehouses.find((warehouse) => warehouse.id === (p.from || p.warehouseId)),
      b = workspace.warehouses.find((warehouse) => warehouse.id === (p.to || p.toWarehouseId));
    if (a && b && a.branchId !== b.branchId && !v.inventory.allowCrossBranchTransfer)
      throw Error('التحويل بين الفروع غير مسموح');
  }
  if (
    (type === 'stockDocument' && p.kind === 'adjustment' && p.status === 'final') ||
    (type === 'operation' && p.kind === 'adjustment')
  ) {
    if (!v.inventory.allowAdjustment) throw Error('تسويات المخزون غير مسموحة');
    if (v.inventory.requireAdjustmentReason && !String(p.note || '').trim())
      throw Error('سبب تسوية المخزون مطلوب');
  }
  if (
    ['voucher', 'contactVoucher', 'expensePayment'].includes(type) &&
    v.expenses.requireVoucherNote &&
    !String(p.note || '').trim()
  )
    throw Error('بيان سند القبض أو الصرف مطلوب');
  if (type === 'expenseSave') {
    const old = workspace.expenseDocuments?.find((d) => d.id === p.id);
    if (
      !v.accounting.multiCurrency &&
      p.currency &&
      p.currency !== workspace.organization.currency &&
      old?.currency !== p.currency
    )
      throw Error('تعدد العملات غير مفعّل');
    if (
      v.expenses.maxExpense &&
      (!old || old.amount !== Number(p.amount) * Number(p.rate || 1)) &&
      Number(p.amount) * Number(p.rate || 1) > v.expenses.maxExpense
    )
      throw Error('قيمة المصروف تتجاوز الحد المعتمد في الإعدادات');
  }
}
