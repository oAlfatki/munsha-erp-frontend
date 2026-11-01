export type FxRateResponse = {
  id: string;
  name: string;
  active: boolean;
  currency?: string;
  date?: string;
  rate?: number;
  source?: string;
  [key: string]: string | number | boolean | undefined;
};
