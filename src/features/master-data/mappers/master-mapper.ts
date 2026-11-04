import type { SaveMasterRequest } from '@/features/ledger/public/types/requests/SaveMasterRequest';
import { masterSchema } from '@/features/master-data/public/master-schema';
export const mapMasterInput = (input: unknown): SaveMasterRequest =>
  masterSchema.parse(input) as SaveMasterRequest;
