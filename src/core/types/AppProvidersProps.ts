import type { Identity } from '@/core/types/Identity';
import type { ReactNode } from 'react';
export interface AppProvidersProps {
  children: ReactNode;
  initialUser?: Identity | null;
}
