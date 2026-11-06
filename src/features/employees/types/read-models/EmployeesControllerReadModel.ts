import type { Branch } from '@/features/organization/public';
import type { Employee } from '@/features/personnel/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface EmployeesControllerReadModel {
  organization: {
    name: string;
    email?: string;
    activity?: string;
    taxNumber?: string;
    registrationNumber?: string;
    address: string;
    phone: string;
    multiBranch: boolean;
    currency: string;
    year: number;
    costPolicy: 'moving_average';
    policyApproved: boolean;
  };
  employees: Employee[];
  branches: Branch[];
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
}
