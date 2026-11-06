import { useCustomersProjectionQuery } from '@/features/customers/queries/useCustomersProjectionQuery';

export function useCustomersProjection() {

  const { state, loading: isLoading, error } = useCustomersProjectionQuery();
  return {
    data: state?.parties.filter((party) => party.kind === 'customer'),
    isPending: isLoading,
    error,
  };
}
