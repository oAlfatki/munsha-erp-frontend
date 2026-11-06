import type { AnnualBooks } from '@/features/ledger/public';
import type {
  BackupPolicy,
  Branch,
  BrandingResponse,
  OrganizationResponse,
} from '@/features/organization/public';
export interface CompanyMetadata {
  organization: OrganizationResponse;
  branding?: BrandingResponse;
  branches: Branch[];
  annualBooks: AnnualBooks;
  backupSettings?: BackupPolicy;
}
