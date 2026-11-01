import type { Identity } from '@/core/types/Identity';
import type { ReactNode } from 'react';
export interface AuthProviderProps {
  children: ReactNode;
  initialUser?: Identity | null;
  readSession: () => Promise<{user:Identity|null}>;
}
