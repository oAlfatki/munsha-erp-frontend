import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
import type { Branch } from '@/features/organization/public/types/models/Branch';
export interface ValidateJournalContext {
  branches: Branch[];
  extras?: ExtensionData;
}
