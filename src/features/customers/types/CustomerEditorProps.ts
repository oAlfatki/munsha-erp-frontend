import type { Party } from '@/features/parties/types/models/Party';
export interface CustomerEditorProps {
  party: Party | null;
  onClose: () => void;
}
