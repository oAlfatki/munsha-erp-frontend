import { useApplication } from '@/core/providers/ApplicationProvider';
import { useFeatureData } from '@/core/providers/FeatureDataScope';
/** UI scope plus the active feature read model. No application-wide ERP snapshot is cached. */
export function useErpContext() {
  return { ...useApplication(), ...useFeatureData() };
}
