export type ContactResponse = {
  id: string;
  name: string;
  active: boolean;
  account?: string;
  kind?: string;
  [key: string]: string | number | boolean | undefined;
};
