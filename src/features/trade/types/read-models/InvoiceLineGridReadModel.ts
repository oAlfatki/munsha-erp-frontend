import type { SystemSettingsContext } from '@/features/organization/public';
import type { Stock } from '@/features/stock/public';
import type { InvoiceItemMatchesContext } from './InvoiceItemMatchesContext';
export interface InvoiceLineGridReadModel extends InvoiceItemMatchesContext, SystemSettingsContext {
  stocks: Stock[];
}
