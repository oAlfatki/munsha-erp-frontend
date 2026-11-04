import { useSuppliersProjectionQuery } from '@/features/suppliers/queries/useSuppliersProjectionQuery';
export function useSuppliersProjection() {
  const { state, loading: isLoading, error } = useSuppliersProjectionQuery();
  return {
    data: state?.parties.filter((party) => party.kind === 'supplier'),
    isPending: isLoading,
    error,
  };
}
