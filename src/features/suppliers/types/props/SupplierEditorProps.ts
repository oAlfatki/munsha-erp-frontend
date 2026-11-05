import type { Party } from '@/features/parties/public';
export interface SupplierEditorProps {
  party: Party | null;
  onClose: () => void;
}
