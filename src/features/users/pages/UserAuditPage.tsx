import { UserAuditReport } from '@/features/users/components/reports/UserAuditReport';
/** حركات المستخدمين — feature-owned route content. */
export default function UserAuditPage() {
  return (
    <section className="screen-page" data-screen="access~audit">
      <UserAuditReport />
    </section>
  );
}
