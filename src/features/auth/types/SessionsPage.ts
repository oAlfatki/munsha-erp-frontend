import type { SessionSummary } from '@/features/auth/types/SessionSummary';

export interface SessionsPage {
  items: SessionSummary[];
  page: number;
  pageSize: number;
  totalCount: number;
}
