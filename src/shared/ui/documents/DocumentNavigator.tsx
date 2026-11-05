import type { DocumentNavigatorProps } from '@/core/types/props/DocumentNavigatorProps';
import { Button } from '@/shared/ui/primitives/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, List } from 'lucide-react';

export function DocumentNavigator({
  index,
  count,
  onChange,
  onList,
  isDisabled: isDisabled = false,
}: DocumentNavigatorProps) {
  return (
    <div className="document-navigator no-print" aria-label="التنقل بين المستندات">
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="أول مستند"
        title="أول مستند"
        disabled={isDisabled || index <= 0 || count === 0}
        onClick={() => onChange(0)}
      >
        <ChevronsRight size={16} />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="المستند السابق"
        disabled={isDisabled || index <= 0 || count === 0}
        onClick={() => onChange(index - 1)}
      >
        <ChevronRight size={16} />
        السابق
      </Button>
      <span>
        {count && index >= 0 ? index + 1 : 0} / {count}
      </span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="المستند اللاحق"
        disabled={isDisabled || index < 0 || index >= count - 1}
        onClick={() => onChange(index + 1)}
      >
        اللاحق
        <ChevronLeft size={16} />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="آخر مستند"
        disabled={isDisabled || index >= count - 1 || !count}
        onClick={() => onChange(count - 1)}
      >
        <ChevronsLeft size={16} />
      </Button>
      {onList && (
        <Button type="button" variant="ghost" size="sm" onClick={onList}>
          <List size={16} />
          القائمة
        </Button>
      )}
    </div>
  );
}
