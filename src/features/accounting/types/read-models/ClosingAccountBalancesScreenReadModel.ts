import type { AnnualBooks } from '@/features/ledger/public/types/models/AnnualBooks';
import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { Party } from '@/features/parties/public/types/models/Party';
import type { Employee } from '@/features/personnel/public/types/models/Employee';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface ClosingAccountBalancesScreenReadModel {
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
  annualBooks?: AnnualBooks;
  entries: Entry[];
  parties: Party[];
  employees: Employee[];
  extras?: ExtensionData;
}
