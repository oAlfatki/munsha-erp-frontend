import type { Role } from '@/features/users/types/Role';

export interface RolesPage {
  items: Role[];
  page: number;
  pageSize: number;
  totalCount: number;
}
