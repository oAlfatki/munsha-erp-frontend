import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { Backups } from '@/features/settings/components/Backups';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** النسخ الاحتياطي — feature-owned route content. */
export default function BackupListPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~backup">
          <Backups initialTab="backup" />
        </section>
      }
    </FeatureDataScope>
  );
}
