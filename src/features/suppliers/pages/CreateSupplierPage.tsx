import { SupplierDirectoryView } from '@/features/suppliers/components/SupplierDirectoryView';
import { useSupplierDirectoryController } from '@/features/suppliers/hooks/useSupplierDirectoryController';
export default function CreateSupplierPage() {
  const model = useSupplierDirectoryController(true);
  return <SupplierDirectoryView model={model} />;
}
