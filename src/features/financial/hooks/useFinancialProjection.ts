




import { useFinancialProjectionQuery } from '@/features/financial/queries/useFinancialProjectionQuery';
export function useFinancialProjection() {
  const { state, loading: isLoading, error } = useFinancialProjectionQuery();
  return { data: state?.entries, isPending: isLoading, error };
}
