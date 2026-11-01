import type { AnnualBooks } from '@/features/accounting/types/models/AnnualBooks';
import type { Entry } from '@/features/accounting/types/models/Entry';
import type { ExtensionData } from '@/features/accounting/types/models/ExtensionData';
import type { VoucherDocument } from '@/features/accounting/types/models/VoucherDocument';
import type { Employee } from '@/features/employees/types/models/Employee';
import type { Expense } from '@/features/expenses/types/models/Expense';
import type { ExpenseDocument } from '@/features/expenses/types/models/ExpenseDocument';
import type { Movement } from '@/features/inventory/types/models/Movement';
import type { Product } from '@/features/inventory/types/models/Product';
import type { Stock } from '@/features/inventory/types/models/Stock';
import type { StockDocument } from '@/features/inventory/types/models/StockDocument';
import type { Warehouse } from '@/features/inventory/types/models/Warehouse';
import type { Party } from '@/features/parties/types/models/Party';
import type { BackupPolicy } from '@/features/settings/types/models/BackupPolicy';
import type { Branch } from '@/features/settings/types/models/Branch';
import type { SystemSettings } from '@/features/settings/types/models/SystemSettings';
import type { Invoice } from '@/features/trade/types/models/Invoice';
import type { Audit } from '@/features/users/types/models/Audit';
/** Minimal input contract derived from this computation and its delegated helpers. */
export interface BuildReorderReportContext {
  extras?: ExtensionData;
  movements: Movement[];
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
  products: Product[];
  systemSettings?: SystemSettings;
  warehouses: Warehouse[];
}
