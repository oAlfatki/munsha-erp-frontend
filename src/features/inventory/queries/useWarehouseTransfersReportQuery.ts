import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import type { WarehouseTransfersReportReadModel } from '@/features/inventory/types/read-models/WarehouseTransfersReportReadModel';
import { assetsQuery } from '@/features/ledger/public/assets-query';
import { booksQuery } from '@/features/ledger/public/books-query';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { customersQuery } from '@/features/parties/public/customers-query';
import { suppliersQuery } from '@/features/parties/public/suppliers-query';
import { employeesQuery } from '@/features/personnel/public/employees-query';
import { itemsQuery } from '@/features/stock/public/items-query';
import { movementsQuery } from '@/features/stock/public/movements-query';
import { warehousesQuery } from '@/features/stock/public/warehouses-query';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
export function useWarehouseTransfersReportQuery() {
  const app = useApplication(),
    identity = useQueryIdentity();
  const { data: books } = useSuspenseQuery(booksQuery(identity));
  const scope = { ...identity, bookId: books.scope.bookId };
  const [q0, q1, q2, q3, q4, q5, q6, q7, q8] = useSuspenseQueries({
    queries: [
      warehousesQuery(scope),
      employeesQuery(scope),
      itemsQuery(scope),
      movementsQuery(scope),
      companyQuery(scope),
      branchesQuery(scope),
      customersQuery(scope),
      suppliersQuery(scope),
      assetsQuery(scope),
    ],
  });
  const state: WarehouseTransfersReportReadModel = {
    warehouses: q0.data.items,
    parties: [...q6.data.items, ...q7.data.items],
    employees: q1.data.items,
    products: q2.data.items,
    movements: q3.data.items,
    extras: {
      records: { assets: mapMasterRecords(q8.data.items) },
      operations: [],
      drafts: {},
      preferences: {},
    },
    organization: q4.data,
    branches: q5.data.items,
  };
  return {
    ...app,
    state,
    loading: false,
    error: '',
    revision: Math.max(
      books.scope.revision,
      q0.data.scope.revision,
      q1.data.scope.revision,
      q2.data.scope.revision,
      q3.data.scope.revision,
      0,
      q5.data.scope.revision,
      q6.data.scope.revision,
      q7.data.scope.revision,
      q8.data.scope.revision,
    ),
  };
}
