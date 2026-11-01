import type { Identity } from '@/core/types/Identity';
export interface AccountPanelProps {
  mode?: 'password' | 'sessions';
  user?: Identity;
}
