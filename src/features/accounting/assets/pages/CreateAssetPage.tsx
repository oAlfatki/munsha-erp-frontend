import { Assets } from '@/features/accounting/assets/components/Assets';
/** إضافة أصل ثابت — feature-owned route content. */
export default function CreateAssetPage() {
  return (
    <section className="screen-page" data-screen="accounts~assets-add">
      <Assets isAdd={true} />
    </section>
  );
}
