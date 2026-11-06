import type { InvoiceLine } from '@/features/trade/types/models/InvoiceLine';

export interface Invoice {
  invoiceDiscount?: number;
  savedById?: string;
  savedByName?: string;
  returnedById?: string;
  returnedByName?: string;
  cashId?: string;
  supplierNumber?: string;
  id: string;
  number: string;
  kind: 'sale' | 'purchase';
  date: string;
  branchId: string;
  warehouseId: string;
  partyId: string;
  currency: string;
  rate: number;
  payment: 'cash' | 'credit' | 'mixed';
  paid?: number;
  taxRate?: number;
  taxAmount?: number;
  subtotal?: number;
  priceType: 'retail' | 'wholesale';
  status: 'draft' | 'final';
  lines: InvoiceLine[];
  total: number;
  note: string;
  createdAt: string;
  reversedBy?: string;
}
