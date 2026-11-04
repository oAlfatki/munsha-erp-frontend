import { CustomerDirectoryView } from '@/features/customers/components/CustomerDirectoryView';
import { useCustomerDirectoryController } from '@/features/customers/hooks/useCustomerDirectoryController';
export default function CustomerListPage() {
  const model = useCustomerDirectoryController(false);
  return <CustomerDirectoryView model={model} />;
}
