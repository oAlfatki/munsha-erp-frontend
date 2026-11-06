import type { SavePartyRequest } from '@/features/parties/public';

export type SaveSupplierRequest = Omit<SavePartyRequest, 'kind'> & {
  kind: 'supplier';
};
