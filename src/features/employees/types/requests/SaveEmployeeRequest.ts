export type SaveEmployeeRequest = {
  id?: string;
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
  marital?: '' | 'single' | 'married' | 'divorced' | 'widowed';
  issueDate?: string | '';
  photo?: string;
  files?: {
    id: string;
    name: string;
    type: 'application/pdf' | 'image/png' | 'image/jpeg';
    data: string;
  }[];
  active: boolean;
};
