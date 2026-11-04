import { ImportMasters } from '@/features/settings/components/ImportMasters';
/** استيراد البطاقات من CSV — feature-owned route content. */
export default function ImportMasterDataPage() {
  return (
    <section className="screen-page" data-screen="settings~migration">
      <ImportMasters />
    </section>
  );
}
