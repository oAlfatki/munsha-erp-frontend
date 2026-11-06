import type { Entry } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
import type { Party } from '@/features/parties/public';
import type { Invoice } from '@/features/trade/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface AccountStatementReadModel {
  parties: Party[];
  branches: Branch[];
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
  invoices: Invoice[];
  entries: Entry[];
}
