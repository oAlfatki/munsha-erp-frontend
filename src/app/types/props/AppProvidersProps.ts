import type { Identity } from '@/core/types/auth/Identity';
import type { ReactNode } from 'react';

export interface AppProvidersProps {
  children: ReactNode;
  initialUser?: Identity | null;
}
