import type { Party } from '@/features/parties/types/models/Party';
export interface SupplierEditorProps {
  party: Party | null;
  onClose: () => void;
}
