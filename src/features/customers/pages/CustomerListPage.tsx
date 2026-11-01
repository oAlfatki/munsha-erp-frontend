import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { CustomerDirectory } from '@/features/customers/components/CustomerDirectory';
import { useCustomersData } from '@/features/customers/hooks/useCustomersData';
export default function CustomerListPage() {
  const featureData = useCustomersData();

  return <FeatureDataScope data={featureData}>{<CustomerDirectory />}</FeatureDataScope>;
}
