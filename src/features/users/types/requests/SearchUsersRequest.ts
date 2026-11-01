export interface SearchUsersRequest {
  page?: number;
  pageSize?: number;
  q?: string;
  active?: boolean;
  role?: 'admin' | 'staff' | 'viewer';
}
