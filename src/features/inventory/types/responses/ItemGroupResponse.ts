export type ItemGroupResponse = {
  id: string;
  name: string;
  active: boolean;
  note?: string;
  [key: string]: string | number | boolean | undefined;
};
