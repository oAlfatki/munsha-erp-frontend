import type { Entry } from "@/features/accounting/public/types/models/Entry";
import type { Party } from "@/features/parties/public/types/models/Party";
export interface BuildCustomerBalancesReportContext {
entries: Entry[];
parties: Party[];
}
