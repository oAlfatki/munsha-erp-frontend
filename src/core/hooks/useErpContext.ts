import { useApplication } from '@/app/providers/ApplicationProvider';
import { useFeatureData } from '@/app/providers/FeatureDataScope';
/** UI scope plus the active feature read model. No application-wide ERP snapshot is cached. */
export function useErpContext() {
  return { ...useApplication(), ...useFeatureData() };
}
