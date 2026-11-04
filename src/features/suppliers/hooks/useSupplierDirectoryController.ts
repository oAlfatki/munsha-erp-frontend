import { ROUTES } from '@/core/config/navigation-paths';

import type { Party } from '@/features/parties/public/types/models/Party';
import { useSuppliersProjection } from '@/features/suppliers/hooks/useSuppliersProjection';
import { useSupplierDirectoryControllerQuery } from '@/features/suppliers/queries/useSupplierDirectoryControllerQuery';
import { useState } from 'react';
export function useSupplierDirectoryController(isInitialCreate = false) {
  const { data: parties = [] } = useSuppliersProjection();
  const { state: s, navigate } = useSupplierDirectoryControllerQuery();
  const [searchQuery, setQ] = useState('');
  const [group, setGroup] = useState('');
  const [editing, setEditing] = useState<Party | null | undefined>(() =>
    isInitialCreate ? null : undefined,
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
    closeEditor: () => {
      setEditing(undefined);
      if (isInitialCreate) navigate(ROUTES.SUPPLIERS);
    },
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
