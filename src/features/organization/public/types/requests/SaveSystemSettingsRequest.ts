export type SaveSystemSettingsRequest =
  | {
      section: 'accounting';
      values: {
        multiCurrency: boolean;
        allowNegativeCash: boolean;
        taxEnabled?: boolean;
        taxRate?: number;
      };
    }
  | {
      section: 'sales';
      values: {
        defaultPrice: 'retail' | 'wholesale';
        allowCredit: boolean;
        allowBelowCost: boolean;
        lineDiscount: boolean;
        maxDiscount: number;
        allowDraftDelete: boolean;
      };
    }
  | {
      section: 'purchases';
      values: {
        allowCredit: boolean;
        updatePurchasePrice: boolean;
        preventDuplicateSupplierNumber: boolean;
        allowDraftDelete: boolean;
      };
    }
  | {
      section: 'inventory';
      values: {
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
    }
  | {
      section: 'expenses';
      values: {
        currency: string;
        requireVoucherNote: boolean;
        maxExpense: number;
      };
    }
  | {
      section: 'documents';
      values: {
        independentBranch: boolean;
        showBranch: boolean;
        showYear: boolean;
        resetYear: boolean;
      };
    }
  | {
      section: 'branches';
      values: {
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
      };
      branchId: string;
    }
  | {
      section: 'company';
      values: {
        name: string;
        tradeName: string;
        address: string;
        phone: string;
        email: string | '';
        activity: string;
        taxNumber: string;
        registrationNumber: string;
        tagline: string;
        color: string;
        logo: string;
      };
    };
