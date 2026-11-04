export type OrganizationResponse = {
  name: string;
  address: string;
  phone: string;
  email?: string;
  activity?: string;
  taxNumber?: string;
  registrationNumber?: string;
  multiBranch: boolean;
  currency: string;
  year: number;
  costPolicy: 'moving_average';
  policyApproved: boolean;
  [key: string]: unknown;
};
