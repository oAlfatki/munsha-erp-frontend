import type { MenuItem as NavigationEntry } from '@/core/types/MenuItem';
export interface EntryProps {
  entry: NavigationEntry;
  view: string;
  go: (v: string) => void;
}
