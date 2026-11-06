import type { GuestLayoutProps } from '@/shared/types/props/GuestLayoutProps';

/** Visual shell for unauthenticated pages; session and form behavior belong to Auth. */
export function GuestLayout({ aside, children }: GuestLayoutProps) {

  return (
    <main className="login-page" dir="rtl">
      <section className="login-story">{aside}</section>
      <section className="login-form-section">
        <div className="login-card">{children}</div>
      </section>
    </main>
  );
}
