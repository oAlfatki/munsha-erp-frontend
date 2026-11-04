import { BranchDirectory } from '@/features/settings/components/screens/BranchDirectory';
/** بطاقات الفروع ومواقع التشغيل — feature-owned route content. */
export default function BranchListPage() {
  

  return (
    <section className="screen-page" data-screen="settings~branches">
          <BranchDirectory />
        </section>
  );
}
