import type { AnnualBooks } from "@/features/accounting/public/types/models/AnnualBooks";
export interface IsArchivedContext {
annualBooks?: AnnualBooks;
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
}
