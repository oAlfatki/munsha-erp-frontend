export interface SearchAuditEventsRequest {
  page?: number;
  pageSize?: number;
  bookId?: string;
  from?: string;
  to?: string;
  q?: string;
  action?: string;
  reference?: string;
}
