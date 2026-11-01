import type { ErpReadModel } from '@/core/types/ErpReadModel';
export interface FeatureData {
  state: ErpReadModel | null;
  revision: number;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
}
