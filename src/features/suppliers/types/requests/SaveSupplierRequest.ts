import type { SavePartyRequest } from '@/features/parties/types/requests/SavePartyRequest';
export type SaveSupplierRequest = Omit<SavePartyRequest, 'kind'> & {
  kind: 'supplier';
};
