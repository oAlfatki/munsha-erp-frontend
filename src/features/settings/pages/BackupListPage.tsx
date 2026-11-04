import { Backups } from '@/features/settings/components/Backups';
/** النسخ الاحتياطي — feature-owned route content. */
export default function BackupListPage() {
  return (
    <section className="screen-page" data-screen="settings~backup">
      <Backups initialTab="backup" />
    </section>
  );
}
