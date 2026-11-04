import { partySchema } from '@/features/parties/public/parties-schema';
import type { SavePartyRequest } from '@/features/parties/public/types/requests/SavePartyRequest';
export const mapPartyInput = (input: unknown): SavePartyRequest =>
  partySchema.parse(input) as SavePartyRequest;
