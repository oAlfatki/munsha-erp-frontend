import type { SavePartyRequest } from '@/features/parties/public';
export type SaveCustomerRequest = Omit<SavePartyRequest, 'kind'> & {
  kind: 'customer';
};
