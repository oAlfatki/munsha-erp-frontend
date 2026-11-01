import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { Access } from '@/features/users/components/Access';
import { useUsersData } from '@/features/users/hooks/useUsersData';
/** قائمة المستخدمين وبطاقة المستخدم — feature-owned route content. */
export default function UserDirectoryPage() {
  const featureData = useUsersData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="access~users">
          <Access />
        </section>
      }
    </FeatureDataScope>
  );
}
