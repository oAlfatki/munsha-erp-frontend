import type { Entry, ExtensionData } from '@/features/ledger/public';
export interface BuildTrialBalanceReportContext {
  entries: Entry[];
  extras?: ExtensionData;
}
