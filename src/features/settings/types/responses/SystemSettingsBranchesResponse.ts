export type SystemSettingsBranchesResponse = Record<
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
