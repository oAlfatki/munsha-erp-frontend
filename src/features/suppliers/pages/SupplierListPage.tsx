import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { SupplierDirectory } from '@/features/suppliers/components/SupplierDirectory';
import { useSuppliersData } from '@/features/suppliers/hooks/useSuppliersData';
export default function SupplierListPage() {
  const featureData = useSuppliersData();

  return <FeatureDataScope data={featureData}>{<SupplierDirectory />}</FeatureDataScope>;
}
