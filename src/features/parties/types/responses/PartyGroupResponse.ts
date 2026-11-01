export type PartyGroupResponse = {
  id: string;
  name: string;
  active: boolean;
  note?: string;
  [key: string]: string | number | boolean | undefined;
};
