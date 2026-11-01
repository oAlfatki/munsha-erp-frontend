import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { Access } from '@/features/users/components/Access';
import { useUsersData } from '@/features/users/hooks/useUsersData';
/** إضافة مستخدم — feature-owned route content. */
export default function CreateUserPage() {
  const featureData = useUsersData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="access~users-add">
          <Access />
        </section>
      }
    </FeatureDataScope>
  );
}
