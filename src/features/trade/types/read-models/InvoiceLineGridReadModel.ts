import type { SystemSettingsContext } from '@/features/organization/public/types/read-models/SystemSettingsContext';
import type { Stock } from '@/features/stock/public/types/models/Stock';
import type { InvoiceItemMatchesContext } from './InvoiceItemMatchesContext';
export interface InvoiceLineGridReadModel extends InvoiceItemMatchesContext, SystemSettingsContext {
  stocks: Stock[];
}
