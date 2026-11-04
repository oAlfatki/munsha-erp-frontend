import type { Party } from "@/features/parties/public/types/models/Party";
export interface SupplierEditorProps {
  party: Party | null;
  onClose: () => void;
}
