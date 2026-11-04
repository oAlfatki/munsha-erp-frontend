import type { Stock } from "@/features/inventory/public/types/models/Stock";
import type { SystemSettingsContext } from "@/features/settings/public/types/read-models/SystemSettingsContext";
import type { InvoiceItemMatchesContext } from './InvoiceItemMatchesContext';
export interface InvoiceLineGridReadModel extends InvoiceItemMatchesContext,SystemSettingsContext{stocks:Stock[];}
