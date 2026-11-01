export type AssetResponse = {
  id: string;
  name: string;
  active: boolean;
  branchId?: string;
  cost?: number;
  salvage?: number;
  life?: number;
  ready?: string;
  [key: string]: string | number | boolean | undefined;
};
