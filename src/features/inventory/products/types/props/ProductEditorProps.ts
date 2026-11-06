import type { Product } from '@/features/stock/public';

export interface ProductEditorProps {
  product: Product | null;
  onClose: () => void;
}
