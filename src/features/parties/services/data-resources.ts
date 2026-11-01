import { collection, records } from '@/core/query/resources';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { fetchPartiesGroups } from '@/features/parties/api/groups-api';
export const PARTY_GROUPS_RESOURCE = collection(
  'parties',
  'partyGroups',
  fetchPartiesGroups,
  (items) => records('groups', items) as Partial<ErpReadModel>,
);
