import { useErpContext } from '@/core/hooks/useErpContext';
export function useFinancialProjection() {
  const { state, loading: isLoading, error } = useErpContext();
  return { data: state?.entries, isPending: isLoading, error };
}
