import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { Access } from '@/features/users/components/Access';
import { useUsersData } from '@/features/users/hooks/useUsersData';
/** الجلسات النشطة وقفل الجلسة — feature-owned route content. */
export default function UserSessionsPage() {
  const featureData = useUsersData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="access~sessions">
          <Access />
        </section>
      }
    </FeatureDataScope>
  );
}
