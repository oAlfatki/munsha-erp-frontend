import type { Product } from '@/features/stock/public/types/models/Product';
export interface ProductEditorProps {
  product: Product | null;
  onClose: () => void;
}
