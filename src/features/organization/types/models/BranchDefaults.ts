export interface BranchDefaults {
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
}
