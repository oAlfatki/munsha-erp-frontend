import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { ReadScope } from '@/core/types/ReadScope';
export interface ResourceResult {
  patch: Partial<ErpReadModel>;
  scope?: ReadScope;
}
