import type { Party } from '@/features/parties/public';
export interface CustomerEditorProps {
  party: Party | null;
  onClose: () => void;
}
