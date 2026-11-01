import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { Access } from '@/features/users/components/Access';
import { useUsersData } from '@/features/users/hooks/useUsersData';
/** تغيير كلمة مرور مستخدم — feature-owned route content. */
export default function ChangePasswordPage() {
  const featureData = useUsersData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="access~password">
          <Access />
        </section>
      }
    </FeatureDataScope>
  );
}
