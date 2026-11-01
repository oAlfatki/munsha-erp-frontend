import type { BranchDefaults } from '@/features/settings/types/models/BranchDefaults';
export interface SystemSettings {
  accounting: {
    multiCurrency: boolean;
    allowNegativeCash: boolean;
    taxEnabled: boolean;
    taxRate: number;
  };
  sales: {
    defaultPrice: 'retail' | 'wholesale';
    allowCredit: boolean;
    allowBelowCost: boolean;
    lineDiscount: boolean;
    maxDiscount: number;
    allowDraftDelete: boolean;
  };
  purchases: {
    allowCredit: boolean;
    updatePurchasePrice: boolean;
    preventDuplicateSupplierNumber: boolean;
    allowDraftDelete: boolean;
  };
  inventory: {
    allowTransfer: boolean;
    allowCrossBranchTransfer: boolean;
    allowAdjustment: boolean;
    requireAdjustmentReason: boolean;
    alert: boolean;
    reorder: number;
    profit: number;
    discount: number;
    showZero: boolean;
  };
  expenses: {
    currency: string;
    requireVoucherNote: boolean;
    maxExpense: number;
  };
  documents: {
    independentBranch: boolean;
    showBranch: boolean;
    showYear: boolean;
    resetYear: boolean;
  };
  branches: Record<string, BranchDefaults>;
}
