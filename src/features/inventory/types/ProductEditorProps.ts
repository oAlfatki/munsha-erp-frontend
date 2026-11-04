import type { Product } from "@/features/inventory/public/types/models/Product";
export interface ProductEditorProps {
  product: Product | null;
  onClose: () => void;
}
