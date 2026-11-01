import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { UserAuditReport } from '@/features/users/components/reports/UserAuditReport';
import { useUsersData } from '@/features/users/hooks/useUsersData';
/** حركات المستخدمين — feature-owned route content. */
export default function UserAuditPage() {
  const featureData = useUsersData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="access~audit">
          <UserAuditReport />
        </section>
      }
    </FeatureDataScope>
  );
}
