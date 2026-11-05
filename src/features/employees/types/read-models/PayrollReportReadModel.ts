import type { ExtensionData } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
import type { Party } from '@/features/parties/public';
import type { Employee } from '@/features/personnel/public';
import type { Product } from '@/features/stock/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface PayrollReportReadModel {
  parties: Party[];
  employees: Employee[];
  products: Product[];
  extras?: ExtensionData;
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
  branches: Branch[];
}
