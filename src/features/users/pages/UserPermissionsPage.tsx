import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { Access } from '@/features/users/components/Access';
import { useUsersData } from '@/features/users/hooks/useUsersData';
/** صلاحيات العمليات والنطاقات — feature-owned route content. */
export default function UserPermissionsPage() {
  const featureData = useUsersData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="access~matrix">
          <Access />
        </section>
      }
    </FeatureDataScope>
  );
}
