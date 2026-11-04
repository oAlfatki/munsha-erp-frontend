import type { SavePartyRequest } from '@/features/parties/public/types/requests/SavePartyRequest';
export type SaveSupplierRequest = Omit<SavePartyRequest, 'kind'> & {
  kind: 'supplier';
};
