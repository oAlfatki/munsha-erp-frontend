import { useErpContext } from '@/core/hooks/useErpContext';
import type { Party } from '@/features/parties/types/models/Party';
import { useSuppliersProjection } from '@/features/suppliers/hooks/useSuppliersProjection';
import { useState } from 'react';
export function useSupplierDirectoryController() {
  const { data: parties = [] } = useSuppliersProjection();
  const { state: s, navigate, view } = useErpContext();
  const [searchQuery, setQ] = useState('');
  const [group, setGroup] = useState('');
  const [editing, setEditing] = useState<Party | null | undefined>(() =>
    view.endsWith('/new') ? null : undefined,
  );
  if (!s) return null;
  const list = parties.filter(
    (party) =>
      party.kind === 'supplier' &&
      (!group || party.groupId === group) &&
      (party.name + party.phone + party.address).includes(searchQuery),
  );
  const label = 'الموردون';
  return {
    s,
    navigate,
    view,
    searchQuery,
    setQ,
    group,
    setGroup,
    editing,
    setEditing,
    list,
    label,
  };
}
