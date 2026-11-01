import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { Backups } from '@/features/settings/components/Backups';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** استرجاع نسخة احتياطية — feature-owned route content. */
export default function RestoreBackupPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~restore">
          <Backups initialTab="restore" />
        </section>
      }
    </FeatureDataScope>
  );
}
