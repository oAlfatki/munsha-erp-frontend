import type {SystemSettingsContext} from '@/features/settings/types/read-models/SystemSettingsContext';
import type {BranchDefaultsContext} from '@/features/settings/types/read-models/BranchDefaultsContext';
import type {OperationCashIdContext} from '@/features/settings/types/read-models/OperationCashIdContext';
import type { BranchDefaults } from '@/features/settings/types/models/BranchDefaults';
import type { SystemSettings } from '@/features/settings/types/models/SystemSettings';

// Frontend read models and display helpers. Authoritative mutations live in server/core.
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { cashOptions, defaultCashId } from '@/features/accounting/services/models/cash';
import { extras } from '@/features/accounting/services/models/extensions';
export function systemSettings(workspace: SystemSettingsContext): SystemSettings {
  const p = extras(workspace).preferences,
    v = workspace.systemSettings;
  return {
    accounting: {
      multiCurrency: true,
      allowNegativeCash: true,
      taxEnabled: false,
      taxRate: 0,
      ...v?.accounting,
    },
    sales: {
      defaultPrice: p.defaultPrice === 'wholesale' ? 'wholesale' : 'retail',
      allowCredit: true,
      allowBelowCost: true,
      lineDiscount: true,
      maxDiscount: 100,
      allowDraftDelete: true,
      ...v?.sales,
    },
    purchases: {
      allowCredit: true,
      updatePurchasePrice: false,
      preventDuplicateSupplierNumber: true,
      allowDraftDelete: true,
      ...v?.purchases,
    },
    inventory: {
      allowTransfer: true,
      allowCrossBranchTransfer: true,
      allowAdjustment: true,
      requireAdjustmentReason: false,
      alert: true,
      reorder: 0,
      profit: Number(p.defaultProfit ?? 10),
      discount: Number(p.defaultDiscount ?? 0),
      showZero: true,
      ...v?.inventory,
    },
    expenses: {
      currency: workspace.organization.currency,
      requireVoucherNote: false,
      maxExpense: 0,
      ...v?.expenses,
    },
    documents: {
      independentBranch: false,
      showBranch: false,
      showYear: false,
      resetYear: true,
      ...v?.documents,
    },
    branches: v?.branches || {},
  };
}
export function branchDefaults(workspace: BranchDefaultsContext, id: string): BranchDefaults {
  const v: Partial<BranchDefaults> = systemSettings(workspace).branches[id] || {};
  return {
    warehouseId:
      workspace.warehouses.find((warehouse) => warehouse.branchId === id && warehouse.active)?.id ||
      '',
    purchaseWarehouseId: '',
    cashId: defaultCashId(id),
    saleCashId: '',
    purchaseCashId: '',
    expenseCashId: '',
    receiptCashId: '',
    paymentCashId: '',
    priceType: systemSettings(workspace).sales.defaultPrice,
    code:
      'B' + String(workspace.branches.findIndex((branch) => branch.id === id) + 1).padStart(2, '0'),
    ...v,
  };
}
export function operationCashId(
  workspace: OperationCashIdContext,
  id: string,
  kind: 'sale' | 'purchase' | 'expense' | 'receipt' | 'payment',
  currency = workspace.organization.currency,
): string {
  const b = branchDefaults(workspace, id),
    key = (
      {
        sale: 'saleCashId',
        purchase: 'purchaseCashId',
        expense: 'expenseCashId',
        receipt: 'receiptCashId',
        payment: 'paymentCashId',
      } as const
    )[kind],
    chosen = b[key] || b.cashId;
  return (
    cashOptions(workspace, id).find((c) => c.id === chosen && c.active && c.currency === currency)
      ?.id ||
    cashOptions(workspace, id).find((c) => c.active && c.currency === currency)?.id ||
    ''
  );
}
