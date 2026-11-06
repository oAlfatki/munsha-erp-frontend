import type { ReportCell } from '@/core/types/reports/ReportCell';
import type { ReportIdentity } from '@/core/types/reports/ReportIdentity';

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

export function safeFilename(name: string) {

  return (
    Array.from(name.slice(0, 130), (character) =>
      character.charCodeAt(0) <= 31 || /[\\/:*?"<>|]/.test(character) ? '-' : character,
    ).join('') || 'report'
  );
}

export function escapeHtml(v: unknown): string {

  return String(v ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
}
