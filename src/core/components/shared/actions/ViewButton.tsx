import { Button } from '@/core/components/ui/button';
import type { ViewButtonProps } from '@/core/types/ViewButtonProps';
import { ArrowUpLeft } from 'lucide-react';

export function ViewButton({ onClick }: ViewButtonProps) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} className="view-btn">
      عرض <ArrowUpLeft size={14} />
    </Button>
  );
}
