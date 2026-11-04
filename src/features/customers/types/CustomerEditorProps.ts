import type { Party } from '@/features/parties/public/types/models/Party';
export interface CustomerEditorProps {
  party: Party | null;
  onClose: () => void;
}
