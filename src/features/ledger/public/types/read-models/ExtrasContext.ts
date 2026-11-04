import type { ExtensionData } from '@/features/ledger/public/types/models/ExtensionData';
export interface ExtrasContext {
  products?: { units: { name: string }[] }[];
  extras?: ExtensionData;
}
