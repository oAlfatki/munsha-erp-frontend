export type EmployeeResponse = {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  job: string;
  branchId: string;
  salary: number;
  currency: string;
  joined: string;
  identity: string;
  issuer: string;
  active: boolean;
  code?: string;
  marital?: '' | 'single' | 'married' | 'divorced' | 'widowed';
  issueDate?: string | '';
  files?: Array<{
    id: string;
    name: string;
    type: 'application/pdf' | 'image/png' | 'image/jpeg';
    data: string;
    [key: string]: unknown;
  }>;
  photo?: string;
  [key: string]: unknown;
};
