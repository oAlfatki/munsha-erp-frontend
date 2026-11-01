import { collection } from '@/core/query/resources';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { fetchCustomers } from '@/features/customers/api/read-api';
export const CUSTOMERS_RESOURCE = collection(
  'customers',
  'customers',
  fetchCustomers,
  (items) => ({ parties: items }) as Partial<ErpReadModel>,
);
