import type { MenuItem as NavigationEntry } from '@/core/types/api/MenuItem';
export interface EntryProps {
  entry: NavigationEntry;
  view: string;
  go: (v: string) => void;
}
