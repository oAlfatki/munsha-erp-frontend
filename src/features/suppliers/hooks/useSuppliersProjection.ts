import { useErpContext } from '@/core/hooks/useErpContext';
export function useSuppliersProjection() {
  const { state, loading: isLoading, error } = useErpContext();
  return {
    data: state?.parties.filter((party) => party.kind === 'supplier'),
    isPending: isLoading,
    error,
  };
}
