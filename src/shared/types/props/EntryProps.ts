import type { MenuItem as NavigationEntry } from '@/core/types/navigation/MenuItem';

export interface EntryProps {
  entry: NavigationEntry;
  view: string;
  go: (v: string) => void;
}
