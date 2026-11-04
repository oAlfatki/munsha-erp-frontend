export type UnitCategoryResponse = {
  id: string;
  name: string;
  active: boolean;
  count?: number;
  [key: string]: string | number | boolean | undefined;
};
