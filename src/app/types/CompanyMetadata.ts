import type { AnnualBooks } from "@/features/accounting/public/types/models/AnnualBooks";
import type { BackupPolicy } from '@/features/settings/types/models/BackupPolicy';
import type { Branch } from "@/features/settings/public/types/models/Branch";
import type { BrandingResponse } from '@/features/settings/types/responses/BrandingResponse';
import type { OrganizationResponse } from '@/features/settings/types/responses/OrganizationResponse';
export interface CompanyMetadata{organization:OrganizationResponse;branding?:BrandingResponse;branches:Branch[];annualBooks:AnnualBooks;backupSettings?:BackupPolicy;}
