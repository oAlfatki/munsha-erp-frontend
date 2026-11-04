import type { SavePartyRequest } from '@/features/parties/public/types/requests/SavePartyRequest';
export type SaveCustomerRequest = Omit<SavePartyRequest, 'kind'> & {
  kind: 'customer';
};
