export type SystemSettingsResponse = {
  accounting: {
    multiCurrency: boolean;
    allowNegativeCash: boolean;
    taxEnabled?: boolean;
    taxRate?: number;
    [key: string]: unknown;
  };
  sales: {
    defaultPrice: 'retail' | 'wholesale';
    allowCredit: boolean;
    allowBelowCost: boolean;
    lineDiscount: boolean;
    maxDiscount: number;
    allowDraftDelete: boolean;
    [key: string]: unknown;
  };
  purchases: {
    allowCredit: boolean;
    updatePurchasePrice: boolean;
    preventDuplicateSupplierNumber: boolean;
    allowDraftDelete: boolean;
    [key: string]: unknown;
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
    [key: string]: unknown;
  };
  expenses: {
    currency: string;
    requireVoucherNote: boolean;
    maxExpense: number;
    [key: string]: unknown;
  };
  documents: {
    independentBranch: boolean;
    showBranch: boolean;
    showYear: boolean;
    resetYear: boolean;
    [key: string]: unknown;
  };
  branches: Record<
    string,
    {
      warehouseId: string;
      purchaseWarehouseId: string;
      cashId: string;
      saleCashId: string;
      purchaseCashId: string;
      expenseCashId: string;
      receiptCashId: string;
      paymentCashId: string;
      priceType: 'retail' | 'wholesale';
      code: string;
      [key: string]: unknown;
    }
  >;
  [key: string]: unknown;
};
