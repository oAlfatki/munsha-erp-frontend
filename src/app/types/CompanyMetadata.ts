import type { AnnualBooks } from '@/features/ledger/public/types/models/AnnualBooks';
import type { BackupPolicy } from '@/features/organization/public/types/models/BackupPolicy';
import type { Branch } from '@/features/organization/public/types/models/Branch';
import type { BrandingResponse } from '@/features/organization/types/responses/BrandingResponse';
import type { OrganizationResponse } from '@/features/organization/types/responses/OrganizationResponse';
export interface CompanyMetadata {
  organization: OrganizationResponse;
  branding?: BrandingResponse;
  branches: Branch[];
  annualBooks: AnnualBooks;
  backupSettings?: BackupPolicy;
}
