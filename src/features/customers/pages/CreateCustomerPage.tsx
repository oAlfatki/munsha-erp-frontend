import { CustomerDirectoryView } from '@/features/customers/components/CustomerDirectoryView';
import { useCustomerDirectoryController } from '@/features/customers/hooks/useCustomerDirectoryController';
export default function CreateCustomerPage() {
  const model = useCustomerDirectoryController(true);
  return <CustomerDirectoryView model={model} />;
}
