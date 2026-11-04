export type UnitResponse = {
  id: string;
  name: string;
  active: boolean;
  category?: string;
  [key: string]: string | number | boolean | undefined;
};
