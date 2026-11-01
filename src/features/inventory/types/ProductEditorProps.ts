import type { Product } from '@/features/inventory/types/models/Product';
export interface ProductEditorProps {
  product: Product | null;
  onClose: () => void;
}
