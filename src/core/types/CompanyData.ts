import type { CompanyMetadata } from './CompanyMetadata';
import type { ResourceResult } from './ResourceResult';
export interface CompanyData {
  state: CompanyMetadata | null;
  resources: ResourceResult[];
  bookId: string;
  revision: number;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
}
