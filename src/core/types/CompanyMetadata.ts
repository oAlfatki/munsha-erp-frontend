import type { ErpReadModel } from './ErpReadModel';
export type CompanyMetadata = Pick<
  ErpReadModel,
  'organization' | 'branding' | 'branches' | 'annualBooks' | 'backupSettings'
>;
