export type AssetForm = {
  method: 'straight-line' | 'variable';
  id?: string;
  code: string;
  name: string;
  branchId: string;
  cost: number;
  residual: number;
  life: number;
  ready: string;
  purchaseDate: string;
  note: string;
  serial: string;
  active: boolean;
  lifeUnit: string;
  lifeInput: number;
  installmentPeriod: 'year' | 'month';
};
