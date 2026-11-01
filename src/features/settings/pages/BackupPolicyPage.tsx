import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { Backups } from '@/features/settings/components/Backups';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** إعدادات النسخ الاحتياطي — feature-owned route content. */
export default function BackupPolicyPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~backup-policy">
          <Backups initialTab="settings" />
        </section>
      }
    </FeatureDataScope>
  );
}
