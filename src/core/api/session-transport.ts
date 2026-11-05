/** Single-flight refresh adapter supplied by the application from the adopted API contract. */
let generation = 0;
let refresh: ((generation: number) => Promise<void>) | undefined;
let flight: Promise<void> | null = null;
export function sessionGeneration() {
  return generation;
}
export function advanceSession() {
  generation++;
  flight = null;
  return generation;
}
export function configureSessionRefresh(handler?: (generation: number) => Promise<void>) {
  refresh = handler;
  flight = null;
}
export function hasSessionRefresh() {
  return !!refresh;
}
export function refreshSession() {
  if (!refresh) throw Error('عقد تجديد الجلسة غير متاح');
  if (!flight) {
    const run = refresh;
    const expected = generation;
    const current = Promise.resolve().then(() => run(expected));
    flight = current;
    void current
      .finally(() => {
        if (flight === current) flight = null;
      })
      .catch(() => {});
  }
  return flight;
}
export function expireSession(expected: number) {
  if (expected !== generation) return;
  advanceSession();
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('auth:unauthorized'));
}
