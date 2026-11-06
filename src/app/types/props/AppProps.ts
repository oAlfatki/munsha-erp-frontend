import type { Identity } from '@/core/types/auth/Identity';

export interface AppProps {
  initialUser?: Identity | null;
}
