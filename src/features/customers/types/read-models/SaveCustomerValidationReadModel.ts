import type { AnnualBooks } from "@/features/accounting/public/types/models/AnnualBooks";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Party } from "@/features/parties/public/types/models/Party";
/** Screen/operation-specific projection; no global ERP data contract. */
/** Screen/operation-specific projection; no global ERP data contract. */
export interface SaveCustomerValidationReadModel {
    organization: {
        name: string;
        email?: string;
        activity?: string;
        taxNumber?: string;
        registrationNumber?: string;
        address: string;
        phone: string;
        multiBranch: boolean;
        currency: string;
        year: number;
        costPolicy: 'moving_average';
        policyApproved: boolean;
    };
    annualBooks?: AnnualBooks;
    extras?: ExtensionData;
    currencies: {
        code: string;
        name: string;
        rate: number;
    }[];
    parties: Party[];
}
