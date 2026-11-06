import type { PaginationProps } from '@/shared/types/props/PaginationProps';
import { Button } from '@/shared/ui/primitives/button';

export function Pagination({ page, hasNext, onPageChange, children }: PaginationProps) {

  return (
    <nav className="dialog-actions" aria-label="ترقيم الصفحات">
      <Button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        السابق
      </Button>
      <span>{children ?? `الصفحة ${page}`}</span>
      <Button disabled={!hasNext} onClick={() => onPageChange(page + 1)}>
        اللاحق
      </Button>
    </nav>
  );
}
