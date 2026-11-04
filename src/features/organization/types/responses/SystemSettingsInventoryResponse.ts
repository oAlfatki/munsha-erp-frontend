export type SystemSettingsInventoryResponse = {
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
