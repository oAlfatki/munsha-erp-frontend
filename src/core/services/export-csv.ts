export function exportCsv(name: string, headers: string[], rows: (string | number)[][]) {

  if (!window.confirm('هل تريد تنزيل قالب CSV؟')) return;

  const safe = (v: string | number) => {

    const str = String(v);
    return '"' + (/^[=+@-]/.test(str) ? '\t' + str : str).replaceAll('"', '""') + '"';
  };

  const text = '\uFEFF' + [headers, ...rows].map((r) => r.map(safe).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8;' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name + '.csv';
  a.click();
  URL.revokeObjectURL(url);
}
