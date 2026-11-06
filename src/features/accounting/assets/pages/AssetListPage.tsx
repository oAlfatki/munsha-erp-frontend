import { Assets } from '@/features/accounting/assets/components/Assets';

/** قائمة الأصول الثابتة — feature-owned route content. */

export default function AssetListPage() {

  return (
    <section className="screen-page" data-screen="accounts~assets">
      <Assets isAdd={false} />
    </section>
  );
}
