import { useVouchersReportView } from '@/features/accounting/hooks/useVouchersReportView';

import { VoucherDetails } from '@/features/accounting/components/VoucherEditor';
import { useVouchersReportQuery } from '@/features/accounting/queries/useVouchersReportQuery';
import { voucherReport } from '@/features/accounting/services/reports/build-voucher-document';
import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { ReportViewer } from '@/shared/ui/reports/ReportViewer';
export function VouchersReport() {
  const model = useVouchersReportView({
    title: 'بحث سندات الصرف والقبض',
    summaryColumns: [4],
    rowDocument: (row) => {
      const v = find(row);
      return state && v ? voucherReport(state, v) : undefined;
    },
  });

  const { state, branchId } = useVouchersReportQuery();
  const find = (row: (string | number)[]) =>
    state?.vouchers?.find((v) => v.reference === row[1] && v.branchId === branchId);
  return (
    <ReportViewer
      title="بحث سندات الصرف والقبض"
      model={model}
      summaryColumns={[4]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
      extraFilters={(filters, setFilters) => (
        <Field label="نوع السند">
          <Select
            value={filters.voucherKind || ''}
            onChange={(e) => setFilters({ ...filters, voucherKind: e.target.value })}
          >
            <option value="">الكل</option>
            <option value="payment">سندات صرف</option>
            <option value="receipt">سندات قبض</option>
          </Select>
        </Field>
      )}
      renderDetails={(row) => {
        const v = find(row);
        return v ? <VoucherDetails document={v} /> : undefined;
      }}
      rowDocument={(row) => {
        const v = find(row);
        return state && v ? voucherReport(state, v) : undefined;
      }}
    />
  );
}
