import type { SavePartyRequest } from '@/features/parties/types/requests/SavePartyRequest';
import { partySchema } from '@/features/parties/validation/parties-schema';
export const mapPartyInput = (input: unknown): SavePartyRequest =>
  partySchema.parse(input) as SavePartyRequest;
