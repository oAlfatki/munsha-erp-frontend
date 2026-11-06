import type { ExtensionData } from '@/features/ledger/public';
import type { Branch } from '@/features/organization/public';
export interface ValidateJournalContext {
  branches: Branch[];
  extras?: ExtensionData;
}
