import { fmt } from '@/core/utils/formatters';
import { ReportViewer } from '@/features/reports/components/ReportViewer';
import { buildSalesChartReport } from '@/features/sales/services/reports/build-sales-chart-report';
export function SalesChartReport() {
  return (
    <ReportViewer
      title="الرسم البياني لحركة المبيعات"
      buildData={buildSalesChartReport}
      summaryColumns={[2]}
      shouldShowFrom={true}
      isAsOf={false}
      shouldShowWarehouse={false}
      renderVisualization={(data) => (
        <div className="panel report-bars">
          {data.rows.map((r, i) => (
            <div className="report-bar" key={i}>
              <span>{r[0]}</span>
              <i
                style={{
                  width: `${Math.max(1, (Math.abs(Number(r[2])) / Math.max(...data.rows.map((r) => Math.abs(Number(r[2]))), 1)) * 75)}%`,
                }}
              />
              <strong>{fmt(Number(r[2]))}</strong>
            </div>
          ))}
        </div>
      )}
    />
  );
}
