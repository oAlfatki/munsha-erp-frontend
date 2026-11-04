import type { EmptyProps } from '@/core/types/EmptyProps';
import { Button } from '@/shared/ui/primitives/button';
import { PackageOpen,Plus } from 'lucide-react';

export function Empty({
  title = 'لا توجد نتائج',
  description = 'جرّب تغيير البحث أو أضف أول سجل.',
  onAction: action,
}: EmptyProps) {
  return (
    <div className="empty">
      <PackageOpen size={40} />
      <h3>{title}</h3>
      <p>{description}</p>
      {action && (
        <Button onClick={action} variant="outline">
          <Plus size={16} />
          إضافة جديد
        </Button>
      )}
    </div>
  );
}
