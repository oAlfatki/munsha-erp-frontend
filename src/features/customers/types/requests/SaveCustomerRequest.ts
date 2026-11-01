import type { SavePartyRequest } from '@/features/parties/types/requests/SavePartyRequest';
export type SaveCustomerRequest = Omit<SavePartyRequest, 'kind'> & {
  kind: 'customer';
};
