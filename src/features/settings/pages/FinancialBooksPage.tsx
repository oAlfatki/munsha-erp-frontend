import { FeatureDataScope } from '@/app/providers/FeatureDataScope';
import { AnnualSettings } from '@/features/settings/components/AnnualSettings';
import { useSettingsData } from '@/features/settings/hooks/useSettingsData';
/** إنشاء الفترة المالية وترحيل الأرصدة — feature-owned route content. */
export default function FinancialBooksPage() {
  const featureData = useSettingsData();

  return (
    <FeatureDataScope data={featureData}>
      {
        <section className="screen-page" data-screen="settings~annual-books">
          <AnnualSettings isConnection={false} />
        </section>
      }
    </FeatureDataScope>
  );
}
