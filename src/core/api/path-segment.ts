export function pathSegment(value: string) {

  if (typeof value !== 'string' || !value.trim()) throw Error('معرّف الطلب مطلوب');
  return encodeURIComponent(value);
}
