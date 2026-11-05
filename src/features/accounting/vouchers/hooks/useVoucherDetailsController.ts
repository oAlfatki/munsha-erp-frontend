import { voucherReport } from '@/features/accounting/reports/services/build-voucher-document';
import { useVoucherDetailsControllerQuery } from '@/features/accounting/vouchers/queries/useVoucherDetailsControllerQuery';
import type { VoucherDetailsProps } from '@/features/accounting/vouchers/types/props/VoucherDetailsProps';
export function useVoucherDetailsController({ document: d }: VoucherDetailsProps) {
  const { state: s } = useVoucherDetailsControllerQuery();
  if (!s) return null;
  const report = voucherReport(s, d);
  return { s, report };
}
