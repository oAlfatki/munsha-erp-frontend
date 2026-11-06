import type { Entry, ExtensionData } from '@/features/ledger/public';

/** Screen/operation-specific projection; no global ERP data contract. */
export interface ContactsLedgerReadModel {
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
  entries: Entry[];
  extras?: ExtensionData;
}
