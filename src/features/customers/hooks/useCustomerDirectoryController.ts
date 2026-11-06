import { ROUTES } from '@/core/config/navigation-paths';

import { useCustomersProjection } from '@/features/customers/hooks/useCustomersProjection';
import { useCustomerDirectoryControllerQuery } from '@/features/customers/queries/useCustomerDirectoryControllerQuery';
import type { Party } from '@/features/parties/public';
import { useState } from 'react';

export function useCustomerDirectoryController(isInitialCreate = false) {

  const { data: parties = [] } = useCustomersProjection();
  const { state, navigate } = useCustomerDirectoryControllerQuery();
  const [searchQuery, setQ] = useState('');
  const [group, setGroup] = useState('');
  const [editing, setEditing] = useState<Party | null | undefined>(() =>
    isInitialCreate ? null : undefined,
  );
  if (!state) return null;
  const list = parties.filter(
    (party) =>
      party.kind === 'customer' &&
      (!group || party.groupId === group) &&
      (party.name + party.phone + party.address).includes(searchQuery),
  );
  const label = 'العملاء';
  return {
    s: state,
    navigate,

    closeEditor: () => {

      setEditing(undefined);
      if (isInitialCreate) navigate(ROUTES.CUSTOMERS);
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
