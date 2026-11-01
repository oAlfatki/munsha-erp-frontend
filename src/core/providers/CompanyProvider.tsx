import { combineResourceQueries, resourceQueryOptions } from '@/core/query/resource-queries';
import { COMPANY_RESOURCES } from '@/core/services/company-resources';
import type { CompanyData } from '@/core/types/CompanyData';
import type { CompanyMetadata } from '@/core/types/CompanyMetadata';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo } from 'react';
import type { ApplicationProviderProps } from '@/core/types/ApplicationProviderProps';
import { useApplication } from './ApplicationProvider';
const Context = createContext<CompanyData | null>(null);
export function CompanyProvider({ children }: ApplicationProviderProps) {
  const app = useApplication(),
    cache = useQueryClient();
  const reads = useQueries({
    queries: COMPANY_RESOURCES.map((resource) =>
      resourceQueryOptions(resource, app.user, '', !!app.user),
    ),
    combine: combineResourceQueries,
  });
  const resources = reads.data;
  const state = useMemo(() => {
    const properties = Object.assign(
      {},
      ...resources.map((result) => result.patch),
    ) as Partial<CompanyMetadata>;
    return reads.ready && properties.organization ? (properties as CompanyMetadata) : null;
  }, [resources, reads.ready]);
  const bookId = resources.find((result) => !!result.patch.annualBooks)?.scope?.bookId || '';
  const branchId =
    state?.branches.find((branch) => branch.id === app.branchId && branch.active)?.id ||
    state?.branches.find((branch) => branch.active)?.id ||
    '';
  useEffect(() => {
    if (branchId !== app.branchId) app.setBranchId(branchId);
  }, [branchId, app.branchId, app.setBranchId]);
  const refresh = async () => {
    await cache.invalidateQueries({ queryKey: ['erp'], refetchType: 'active' });
  };
  return (
    <Context.Provider
      value={{
        state: reads.ready ? state : null,
        resources,
        bookId,
        revision: Math.max(0, ...resources.map((result) => result.scope?.revision || 0)),
        loading: !reads.error && reads.pending,
        error: reads.error,
        refresh,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useCompanyData() {
  const data = useContext(Context);
  if (!data) throw Error('CompanyProvider is required');
  return data;
}
