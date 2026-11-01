import { useErpContext } from '@/core/hooks/useErpContext';
import type { VoucherDetailsProps } from '@/features/accounting/types/VoucherDetailsProps';
import { voucherReport } from '@/features/reports/services/models/report-documents';
export function useVoucherDetailsController({ document: d }: VoucherDetailsProps) {
  const { state: s } = useErpContext();
  if (!s) return null;
  const report = voucherReport(s, d);
  return { s, report };
}
