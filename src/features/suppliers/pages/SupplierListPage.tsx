import { SupplierDirectoryView } from '@/features/suppliers/components/SupplierDirectoryView';
import { useSupplierDirectoryController } from '@/features/suppliers/hooks/useSupplierDirectoryController';

export default function SupplierListPage() {

  const model = useSupplierDirectoryController(false);
  return <SupplierDirectoryView model={model} />;
}
