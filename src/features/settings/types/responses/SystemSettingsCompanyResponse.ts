export type SystemSettingsCompanyResponse = {
  name: string;
  tradeName: string;
  address: string;
  phone: string;
  email: string | '';
  activity: string;
  taxNumber: string;
  registrationNumber: string;
  tagline: string;
  color: string;
  logo: string;
  [key: string]: unknown;
};
