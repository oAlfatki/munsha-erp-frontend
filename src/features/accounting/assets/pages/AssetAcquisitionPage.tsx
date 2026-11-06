import { AssetAcquisitionScreen } from '@/features/accounting/assets/components/screens/AssetAcquisitionScreen';

/** إثبات اقتناء أصل — feature-owned route content. */

export default function AssetAcquisitionPage() {

  return (
    <section className="screen-page" data-screen="accounts~asset-purchase">
      <AssetAcquisitionScreen />
    </section>
  );
}
