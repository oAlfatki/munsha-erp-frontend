import type { ErpReadModel } from '@/core/types/ErpReadModel';
import type { Filters } from '@/core/types/Filters';
import type { ReportData } from '@/core/types/ReportData';
export function buildUserAuditReport(
  workspace: ErpReadModel,
  branch: string,
  filters: Filters,
): ReportData {
  const within = (d: string) =>
    (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);
  let reportData: ReportData = { headers: [], rows: [] };
  {
    reportData = {
      headers: ['التاريخ والوقت', 'الإجراء', 'المرجع', 'الفاعل'],
      rows: workspace.audit
        .filter((a) => within(a.date.slice(0, 10)))
        .map((a) => [
          new Date(a.date).toLocaleString('ar-YE'),
          a.action,
          a.reference,
          'غير مسجل لهذا الحدث',
        ]),
      note: 'الأحداث الفعلية على مستوى مساحة المالك. لا ننسب العملية لموظف محاكاة باعتباره هوية موثقة.',
    };
  }
  if (filters.query) {
    reportData.rows = reportData.rows.filter((row) =>
      row.join(' ').toLowerCase().includes(filters.query.toLowerCase()),
    );
  }
  return reportData;
}
