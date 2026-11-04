import { SystemSettings } from '@/features/settings/components/SystemSettings';
/** إعدادات المستندات والترقيم — feature-owned route content. */
export default function DocumentsSettingsPage() {
  return (
    <section className="screen-page" data-screen="settings~system-documents">
      <SystemSettings initialTab="documents" />
    </section>
  );
}
