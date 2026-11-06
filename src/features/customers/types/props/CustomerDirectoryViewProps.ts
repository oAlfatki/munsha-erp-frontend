import type { useCustomerDirectoryController } from '@/features/customers/hooks/useCustomerDirectoryController';
export interface CustomerDirectoryViewProps {
  model: ReturnType<typeof useCustomerDirectoryController>;
}
