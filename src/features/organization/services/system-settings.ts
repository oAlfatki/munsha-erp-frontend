import type { BranchDefaults } from '@/features/organization/types/models/BranchDefaults';
import type { SystemSettings } from '@/features/organization/types/models/SystemSettings';
import type { BranchDefaultsContext } from '@/features/organization/types/read-models/BranchDefaultsContext';
import type { OperationCashIdContext } from '@/features/organization/types/read-models/OperationCashIdContext';
import type { SystemSettingsContext } from '@/features/organization/types/read-models/SystemSettingsContext';

// Frontend display calculations; backend authority requires independent verification.
import { cashOptions, defaultCashId, extras } from '@/features/ledger/public';

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
