import { expect, it } from 'vitest';
import { reportHtml } from '@/core/reporting/html';
import { BLANK_IDENTITY } from '@/core/reporting/formatting';
import { DEFAULT_DEVICE_SETTINGS } from '@/core/services/device-settings';

it('escapes report data and excludes active SVG branding from document HTML', () => {
  const hostile = '<script>alert("x")</script>';
  const html = reportHtml(
    {
      title: hostile,
      metadata: [[hostile, hostile]],
      tables: [{ headers: [hostile], rows: [[hostile]] }],
      totals: [[hostile, hostile]],
      words: [hostile],
      notes: [hostile],
      signatures: [hostile],
    },
    { ...BLANK_IDENTITY, name: hostile, logo: 'data:image/svg+xml;base64,PHN2Zz4=' },
    { ...DEFAULT_DEVICE_SETTINGS, logo: true, words: true },
  );
  expect(html).not.toContain('<script>');
  expect(html).not.toContain('data:image/svg+xml');
  expect(html).toContain('&lt;script&gt;');
});

it('keeps safe download filename behavior for controls, punctuation and Unicode', async () => {
  const { safeFilename } = await import('@/core/reporting/formatting');
  expect(safeFilename('a\u0000/b\n?.pdf')).toBe('a--b--.pdf');
  expect(safeFilename('تقرير😀')).toBe('تقرير😀');
  expect(safeFilename('')).toBe('report');
  expect(safeFilename('x'.repeat(140))).toHaveLength(130);
});
