




import { useCustomersProjection } from '@/features/customers/hooks/useCustomersProjection';
import { useCustomerDirectoryControllerQuery } from '@/features/customers/queries/useCustomerDirectoryControllerQuery';
import type { Party } from "@/features/parties/public/types/models/Party";
import { useState } from 'react';
export function useCustomerDirectoryController() {
  const { data: parties = [] } = useCustomersProjection();
  const { state: s, navigate, view } = useCustomerDirectoryControllerQuery();
  const [searchQuery, setQ] = useState('');
  const [group, setGroup] = useState('');
  const [editing, setEditing] = useState<Party | null | undefined>(() =>
    view.endsWith('/new') ? null : undefined,
  );
  if (!s) return null;
  const list = parties.filter(
    (party) =>
      party.kind === 'customer' &&
      (!group || party.groupId === group) &&
      (party.name + party.phone + party.address).includes(searchQuery),
  );
  const label = 'العملاء';
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
