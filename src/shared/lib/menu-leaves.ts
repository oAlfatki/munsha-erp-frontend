import type { MenuItem } from '@/shared/types/navigation/MenuItem';

export const menuLeaves = (entries: MenuItem[]): MenuItem[] =>
  entries.flatMap((entry) => (entry.children ? menuLeaves(entry.children) : [entry]));
