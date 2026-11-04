import type { VoucherLine } from '@/features/ledger/types/models/VoucherLine';
export interface VoucherDocument {
  id: string;
  reference: string;
  kind: 'receipt' | 'payment';
  date: string;
  branchId: string;
  partyId: string;
  note: string;
  lines: VoucherLine[];
  total: number;
  createdAt: string;
  savedById?: string;
  savedByName?: string;
}
