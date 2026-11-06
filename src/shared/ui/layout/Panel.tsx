import type { PanelProps } from '@/shared/types/props/PanelProps';

export function Panel({ title, description, action, className = '', children }: PanelProps) {

  return (
    <section className={'panel ' + className}>
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
