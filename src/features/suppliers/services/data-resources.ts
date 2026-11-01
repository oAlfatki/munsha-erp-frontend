import { collection } from '@/core/query/resources';
import type { ErpReadModel } from '@/core/types/ErpReadModel';
import { fetchSuppliers } from '@/features/suppliers/api/read-api';
export const SUPPLIERS_RESOURCE = collection(
  'suppliers',
  'suppliers',
  fetchSuppliers,
  (items) => ({ parties: items }) as Partial<ErpReadModel>,
);
