import { useErpContext } from '@/core/hooks/useErpContext';
export function useCustomersProjection() {
  const { state, loading: isLoading, error } = useErpContext();
  return {
    data: state?.parties.filter((party) => party.kind === 'customer'),
    isPending: isLoading,
    error,
  };
}
