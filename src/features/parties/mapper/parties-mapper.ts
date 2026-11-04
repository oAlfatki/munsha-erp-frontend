import type { SavePartyRequest } from "@/features/parties/public/types/requests/SavePartyRequest";
import { partySchema } from "@/features/parties/public/parties-schema";
export const mapPartyInput = (input: unknown): SavePartyRequest =>
  partySchema.parse(input) as SavePartyRequest;
