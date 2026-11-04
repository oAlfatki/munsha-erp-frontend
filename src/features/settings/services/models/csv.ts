// Frontend display calculations; backend authority requires independent verification.
export function parseMasterCsv(input: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [],
    cell = '',
    isQuoted = false;
  input = input.replace(/^\uFEFF/, '');
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === '"') {
      if (isQuoted && input[i + 1] === '"') {
        cell += '"';
        i++;
      } else isQuoted = !isQuoted;
    } else if (c === ',' && !isQuoted) {
      row.push(cell);
      cell = '';
    } else if ((c === '\n' || c === '\r') && !isQuoted) {
      if (c === '\r' && input[i + 1] === '\n') i++;
      row.push(cell);
      if (row.some((v) => v)) result.push(row);
      row = [];
      cell = '';
    } else cell += c;
  }
  if (isQuoted) throw Error('علامات اقتباس غير مغلقة');
  row.push(cell);
  if (row.some((v) => v)) result.push(row);
  if (result.length < 2 || result.length > 201)
    throw Error('ملف بعناوين وصف واحد على الأقل، وحتى 200 صف');
  const headers = result[0].map((h) => h.trim());
  if (headers.some((h) => !h) || new Set(headers).size !== headers.length)
    throw Error('عناوين الأعمدة فارغة أو مكررة');
  if (result.slice(1).some((r) => r.length !== headers.length))
    throw Error('عدد الحقول لا يطابق العناوين');
  return [headers, ...result.slice(1)];
}
