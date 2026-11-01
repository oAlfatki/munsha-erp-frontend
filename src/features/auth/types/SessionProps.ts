import type { Identity } from '@/core/types/Identity';
export interface SessionProps {
  user: Identity | null;
  signInHref: string;
  signOutHref: string;
}
