import { Backups } from '@/features/settings/components/Backups';
/** إعدادات النسخ الاحتياطي — feature-owned route content. */
export default function BackupPolicyPage() {
  return (
    <section className="screen-page" data-screen="settings~backup-policy">
      <Backups initialTab="settings" />
    </section>
  );
}
