import { FeatureDataScope } from '@/core/providers/FeatureDataScope';
import { SystemSettings } from '@/features/settings/components/SystemSettings';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
export default function SettingsOverviewPage() {
  const featureData = useSettingsData();

  return <FeatureDataScope data={featureData}>{<SystemSettings />}</FeatureDataScope>;
}
