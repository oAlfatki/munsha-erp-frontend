import { AnnualSettings } from "@/features/settings/public/AnnualSettings";
/** حالة الاتصال بقاعدة البيانات — feature-owned route content. */
export default function DatabaseStatusPage() {
  

  return (
    <section className="screen-page" data-screen="settings~database">
          <AnnualSettings isConnection={true} />
        </section>
  );
}
