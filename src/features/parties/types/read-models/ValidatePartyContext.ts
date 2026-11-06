import type { ExtensionData } from '@/features/ledger/public';
import type { Party } from '@/features/parties/types/models/Party';

export interface ValidatePartyContext {
  currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
  parties: Party[];
  extras?: ExtensionData;
}
