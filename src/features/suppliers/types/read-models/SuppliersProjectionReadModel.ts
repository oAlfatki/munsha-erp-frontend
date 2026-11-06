import type { Party } from '@/features/parties/public';
/** Screen/operation-specific projection; no global ERP data contract. */
export interface SuppliersProjectionReadModel {
  parties: Party[];
}
