import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Party } from "@/features/parties/public/types/models/Party";
export interface ValidatePartyContext {
currencies: {
    code: string;
    name: string;
    rate: number;
  }[];
parties: Party[];
extras?: ExtensionData;
}
