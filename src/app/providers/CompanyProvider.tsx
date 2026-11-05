import { useAuth } from '@/core/auth/AuthProvider';
import type { CompanyData } from '@/app/types/CompanyData';
import type { CompanyProviderProps } from '@/app/types/CompanyProviderProps';
import { useQueryIdentity } from '@/core/hooks/useQueryIdentity';
import { useApplication } from '@/core/state/ApplicationProvider';
import { booksQuery } from '@/features/ledger/public/books-query';
import { backupPolicyQuery } from '@/features/organization/public/backup-policy-query';
import { branchesQuery } from '@/features/organization/public/branches-query';
import { brandingQuery } from '@/features/organization/public/branding-query';
import { companyQuery } from '@/features/organization/public/company-query';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect } from 'react';
const Context = createContext<CompanyData | null>(null);
/** Shell metadata only; screens own their data directly through feature queries. */
export function CompanyProvider({ children }: CompanyProviderProps) {
  const { user } = useAuth();
  const app = useApplication(),
    scope = useQueryIdentity(),
    client = useQueryClient();
  const [company, branding, branches, books, backup] = useQueries({
    queries: [
      companyQuery(scope),
      brandingQuery(scope),
      branchesQuery(scope),
      booksQuery(scope),
      backupPolicyQuery(scope),
    ],
  });
  const isReady =
    company.isSuccess &&
    branding.isSuccess &&
    branches.isSuccess &&
    books.isSuccess &&
    backup.isSuccess;
  const error =
    [company, branding, branches, books, backup].find((q) => q.error)?.error?.message || '';
  const state = isReady
    ? {
        organization: company.data,
        branding: branding.data,
        branches: branches.data.items.filter((branch) => String(branch.id) === user?.branchId),
        annualBooks: { activeId: books.data.scope.bookId, books: books.data.items },
        backupSettings: backup.data,
      }
    : null;
  const branchId = user?.branchId || '';
  useEffect(() => {
    if (branchId !== app.branchId) app.setBranchId(branchId);
  }, [branchId, app.branchId, app.setBranchId]);
  return (
    <Context.Provider
      value={{
        state,
        bookId: books.data?.scope.bookId || '',
        revision: Math.max(branches.data?.scope.revision || 0, books.data?.scope.revision || 0),
        loading: !isReady && !error,
        error,
        refresh: async () => {
          await client.invalidateQueries({ queryKey: ['erp'], refetchType: 'active' });
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useCompanyData() {
  const context = useContext(Context);
  if (!context) throw Error('CompanyProvider is required');
  return context;
}
