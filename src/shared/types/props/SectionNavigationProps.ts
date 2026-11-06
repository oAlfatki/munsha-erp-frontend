import type { MenuItem } from '@/shared/types/navigation/MenuItem';

export interface SectionNavigationProps {
  entries: MenuItem[];
  view: string;
  go: (v: string) => void;
}
