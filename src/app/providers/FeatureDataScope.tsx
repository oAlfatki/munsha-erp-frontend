import { LoadingState } from '@/shared/ui/feedback/LoadingState';
import { Button } from '@/shared/ui/primitives/button';
import type { FeatureData } from '@/core/types/FeatureData';
import type { FeatureDataScopeProps } from '@/core/types/FeatureDataScopeProps';
import { createContext, useContext } from 'react';
const Context = createContext<FeatureData | null>(null);
/** Page-scoped read model only. Fetching and caching remain in the feature's Query hook. */
export function FeatureDataScope({ data, children }: FeatureDataScopeProps) {
  if (data.error)
    return (
      <section className="panel">
        <p role="alert">{data.error}</p>
        <Button onClick={() => void data.refresh()}>إعادة المحاولة</Button>
      </section>
    );
  if (data.loading) return <LoadingState />;
  return <Context.Provider value={data}>{children}</Context.Provider>;
}
export function useFeatureData() {
  const data = useContext(Context);
  if (!data) throw Error('FeatureDataScope is required');
  return data;
}
