import { DepreciationScreen } from '@/features/accounting/assets/components/screens/DepreciationScreen';

/** إثبات إهلاك فترة — feature-owned route content. */

export default function AssetDepreciationPage() {

  return (
    <section className="screen-page" data-screen="accounts~depreciation">
      <DepreciationScreen />
    </section>
  );
}
