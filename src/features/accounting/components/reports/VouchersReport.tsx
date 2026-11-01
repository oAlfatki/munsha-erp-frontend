import { Field } from '@/shared/ui/forms/Field';
import { Select } from '@/shared/ui/forms/Select';
import { useErpContext } from '@/core/hooks/useErpContext';
import { VoucherDetails } from '@/features/accounting/components/VoucherEditor';
import { buildVouchersReport } from '@/features/accounting/services/reports/build-vouchers-report';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
import { voucherReport } from '@/features/reports/services/models/report-documents';
export function VouchersReport() {
  const { state, branchId } = useErpContext();
  const find = (row: (string | number)[]) =>
    state?.vouchers?.find((v) => v.reference === row[1] && v.branchId === branchId);
  return (
    <ReportViewer
      title="بحث سندات الصرف والقبض"
      buildData={buildVouchersReport}
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
