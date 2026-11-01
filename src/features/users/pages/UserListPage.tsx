import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { Access } from '@/features/users/components/Access';
import { useUsersData } from '@/features/users/hooks/useUsersData';
export default function UserListPage() {
  const featureData = useUsersData();

  return <FeatureDataScope data={featureData}>{<Access />}</FeatureDataScope>;
}
