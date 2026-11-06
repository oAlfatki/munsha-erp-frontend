import type { useSupplierDirectoryController } from '@/features/suppliers/hooks/useSupplierDirectoryController';

export interface SupplierDirectoryViewProps {
  model: ReturnType<typeof useSupplierDirectoryController>;
}
