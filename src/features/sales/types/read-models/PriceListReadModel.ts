import type { AnnualBooks } from "@/features/accounting/public/types/models/AnnualBooks";
import type { ExtensionData } from "@/features/accounting/public/types/models/ExtensionData";
import type { Product } from "@/features/inventory/public/types/models/Product";
/** Screen/operation-specific projection; no global ERP data contract. */
export interface PriceListReadModel {
  products: Product[];
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
  extras?: ExtensionData;
  annualBooks?: AnnualBooks;
}
