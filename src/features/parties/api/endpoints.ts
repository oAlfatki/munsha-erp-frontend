import { pathSegment } from '@/core/api/path-segment';

export const ENDPOINTS = {
  fetchCustomers: `/customers`,

  fetchCustomersById: (id: string) => `/customers/${pathSegment(id)}`,

  fetchPartiesGroups: `/parties/groups`,

  fetchPartiesGroupsById: (id: string) => `/parties/groups/${pathSegment(id)}`,

  fetchSuppliers: `/suppliers`,

  fetchSuppliersById: (id: string) => `/suppliers/${pathSegment(id)}`,
} as const;
