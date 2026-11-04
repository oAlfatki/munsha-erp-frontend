export type SystemSettingsSalesResponse = {
  defaultPrice: 'retail' | 'wholesale';
  allowCredit: boolean;
  allowBelowCost: boolean;
  lineDiscount: boolean;
  maxDiscount: number;
  allowDraftDelete: boolean;
  [key: string]: unknown;
};
