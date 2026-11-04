import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { Audit } from '@/features/users/public/types/models/Audit';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface UserAuditReportReadModel {
  audit: Audit[];
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
