import type { Filters } from '@/core/types/api/Filters';
import { useState } from 'react';
import { toast } from 'sonner';
export function useReportFilters(initial: Filters) {
  const [draft, setDraft] = useState(initial),
    [filters, setFilters] = useState(initial);
  const handleApplyFilters = () => {
    if (draft.from && draft.to && draft.from > draft.to) {
      toast.error('بداية المدى بعد نهايته');
      return;
    }
    setFilters({ ...draft });
  };
  return { initial, draft, setDraft, filters, setFilters, handleApplyFilters };
}
