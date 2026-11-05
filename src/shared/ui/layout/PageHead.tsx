import type { PageHeadProps } from '@/core/types/props/PageHeadProps';
import { Button } from '@/shared/ui/primitives/button';
import { Plus } from 'lucide-react';

export function PageHead({
  title,
  description,
  onAction: action,
  label = 'إضافة جديد',
  extra,
}: PageHeadProps) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">
          مساحة العمل <span>/</span> {title}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="flex gap-2 items-center">
        {extra}
        {action && (
          <Button onClick={action}>
            <Plus size={17} />
            {label}
          </Button>
        )}
      </div>
    </div>
  );
}
