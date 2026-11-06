import type { SaveMasterRequest } from '@/features/ledger/public';
import { masterSchema } from '@/features/master-data/validations/master-schema';

export const mapMasterInput = (input: unknown): SaveMasterRequest => masterSchema.parse(input);
