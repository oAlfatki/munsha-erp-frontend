import type { Entry } from '@/features/ledger/types/models/Entry';
import type { ExtensionData } from '@/features/ledger/types/models/ExtensionData';
export interface AccountClosingContext {
  entries: Entry[];
  parties: { id: string; name: string }[];
  employees: { id: string; name: string }[];
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
}
