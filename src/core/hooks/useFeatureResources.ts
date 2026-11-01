import { useApplication } from '@/app/providers/ApplicationProvider';
import { useCompanyData } from '@/app/providers/CompanyProvider';
import { combineResourceQueries, resourceQueryOptions } from '@/core/query/resource-queries';
import { mergeResources } from '@/core/query/resources';
import type { DataResource } from '@/core/types/DataResource';
import type { FeatureData } from '@/core/types/FeatureData';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
/** Reusable Query mechanics; the consuming feature declares its own dependencies. */
export function useFeatureResources(resources: DataResource[]): FeatureData {
  const app = useApplication(),
    company = useCompanyData();
  const reads = useQueries({
    queries: resources.map((resource) =>
      resourceQueryOptions(
        resource,
        app.user,
        company.bookId,
        !!app.user && !company.loading && !company.error,
      ),
    ),
    combine: combineResourceQueries,
  });
  const parts = useMemo(
    () => [...company.resources, ...reads.data],
    [company.resources, reads.data],
  );
  const state = useMemo(() => mergeResources(parts), [parts]);
  return {
    state,
    revision: Math.max(company.revision, ...parts.map((result) => result.scope?.revision || 0)),
    loading: company.loading || reads.pending,
    error: company.error || reads.error,
    refresh: company.refresh,
  };
}
