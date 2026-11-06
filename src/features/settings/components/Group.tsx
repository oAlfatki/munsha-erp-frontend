import type { GroupProps } from '@/features/settings/types/props/GroupProps';

export function Group({ title, children }: GroupProps) {

  return (
    <section className="settings-form-group">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
