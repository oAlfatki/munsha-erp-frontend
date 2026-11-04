import { useVoucherDetailsControllerQuery } from '@/features/accounting/queries/useVoucherDetailsControllerQuery';
import { voucherReport } from '@/features/accounting/services/reports/build-voucher-document';
import type { VoucherDetailsProps } from '@/features/accounting/types/VoucherDetailsProps';
export function useVoucherDetailsController({ document: d }: VoucherDetailsProps) {
  const { state: s } = useVoucherDetailsControllerQuery();
  if (!s) return null;
  const report = voucherReport(s, d);
  return { s, report };
}
