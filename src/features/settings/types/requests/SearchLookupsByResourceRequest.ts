export interface SearchLookupsByResourceRequest {
  resource:
    | 'branches'
    | 'warehouses'
    | 'items'
    | 'customers'
    | 'suppliers'
    | 'employees'
    | 'units'
    | 'unit-categories'
    | 'item-groups'
    | 'party-groups'
    | 'expense-types'
    | 'accounts'
    | 'cash-accounts'
    | 'currencies'
    | 'assets'
    | 'contacts'
    | 'financial-books';
  page?: number;
  pageSize?: number;
  q?: string;
  bookId?: string;
  branchId?: string;
  currency?: string;
}
