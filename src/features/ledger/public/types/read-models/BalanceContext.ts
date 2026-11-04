import type { Entry } from '@/features/ledger/public/types/models/Entry';
export interface BalanceContext {
  entries: Entry[];
}
