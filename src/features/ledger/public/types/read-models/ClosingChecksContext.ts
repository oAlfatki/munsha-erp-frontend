import type { Entry } from '@/features/ledger/public/types/models/Entry';
import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
export interface ClosingChecksContext {
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
  invoices: { status: 'draft' | 'final' }[];
  stockDocuments?: { status: 'draft' | 'final' }[];
  entries: Entry[];
  branches: { id: string; name: string }[];
  stocks: { productId: string; warehouseId: string; qty: number; value: number }[];
  extras?: ExtensionData;
  parties: { id: string; name: string }[];
  employees: { id: string; name: string }[];
  products: { id: string; code: string; name: string; units: { name: string }[] }[];
  warehouses: { id: string; name: string; branchId: string }[];
  movements: { productId: string; warehouseId: string; date: string; qty: number; value: number }[];
}
