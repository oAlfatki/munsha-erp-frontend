import type { CompanyMetadata } from './CompanyMetadata';

export interface CompanyData {
  state: CompanyMetadata | null;
  bookId: string;
  revision: number;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
}
