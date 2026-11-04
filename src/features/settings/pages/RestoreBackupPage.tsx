import { Backups } from '@/features/settings/components/Backups';
/** استرجاع نسخة احتياطية — feature-owned route content. */
export default function RestoreBackupPage() {
  

  return (
    <section className="screen-page" data-screen="settings~restore">
          <Backups initialTab="restore" />
        </section>
  );
}
