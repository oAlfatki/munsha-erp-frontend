import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { booksQuery } from '@/features/ledger/public/books-query';
import { currenciesQuery } from '@/features/ledger/public/currencies-query';
import { mapMasterRecords } from '@/features/ledger/public/master-records';
import { companyQuery } from '@/features/organization/public/company-query';
import { partyGroupsQuery } from '@/features/parties/public/party-groups-query';
import { suppliersQuery } from '@/features/parties/public/suppliers-query';
import type { SaveSupplierValidationReadModel } from '@/features/suppliers/types/read-models/SaveSupplierValidationReadModel';
import { useQueryClient } from '@tanstack/react-query';
export function useSaveSupplierValidationData() {
  const identity = useQueryIdentity(),
    client = useQueryClient();
  return async () => {
    const books = await client.ensureQueryData(booksQuery(identity));
    const scope = { ...identity, bookId: books.scope.bookId };
    const [d0, d4, d5, d8] = await Promise.all([
      client.ensureQueryData(companyQuery(scope)),
      client.ensureQueryData(currenciesQuery(scope)),
      client.ensureQueryData(suppliersQuery(scope)),
      client.ensureQueryData(partyGroupsQuery(scope)),
    ]);
    const q0 = { data: d0 };
    const q4 = { data: d4 };
    const q5 = { data: d5 };
    const q8 = { data: d8 };
    const state: SaveSupplierValidationReadModel = {
      organization: q0.data,
      annualBooks: { activeId: books.scope.bookId, books: books.items },
      extras: {
        records: { groups: [...mapMasterRecords(q8.data.items)] },
        operations: [],
        drafts: {},
        preferences: {},
      },
      currencies: q4.data.items,
      parties: [...q5.data.items],
    };
    return state;
  };
}
