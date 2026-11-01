import type { ReadParams } from '@/core/types/ReadParams';
import type { ResourceResult } from '@/core/types/ResourceResult';
export interface DataResource {
  id: string;
  owner: string;
  read: (params: ReadParams) => Promise<ResourceResult>;
}
