import type { EmployeeFile } from '@/features/organization/public';

export interface Employee {
  code?: string;
  marital?: string;
  issueDate?: string;
  photo?: string;
  files?: EmployeeFile[];
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
}
