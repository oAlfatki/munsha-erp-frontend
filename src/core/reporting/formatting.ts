import type { ReportCell } from '@/core/types/ReportCell';
import type { ReportIdentity } from '@/core/types/ReportIdentity';

export const BLANK_IDENTITY: ReportIdentity = {
  name: '',
  legalName: '',
  address: '',
  phone: '',
  email: '',
  taxNumber: '',
  registrationNumber: '',
  logo: '',
  branch: '',
  year: 0,
  user: '',
};
export let reportIdentity = BLANK_IDENTITY;
export function setReportIdentity(v: ReportIdentity) {
  reportIdentity = v;
}
export const formatCell = (v: ReportCell) =>
  typeof v === 'number'
    ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 }).format(v)
    : v;
export const safeFilename = (name: string) =>
  // eslint-disable-next-line no-control-regex -- Strip control characters from exported report values.
  name.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '-').slice(0, 130) || 'report';
export function escapeHtml(v: unknown): string {
  return String(v ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}
