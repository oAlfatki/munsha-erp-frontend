import { ROUTES } from '@/core/config/navigation-paths';
/** Only local paths can be restored after authentication. */
export function loginDestination(from: unknown) {
  if (
    typeof from !== 'string' ||
    !from.startsWith('/') ||
    from.startsWith('//') ||
    Array.from(from).some((char) => char === '\\' || char.charCodeAt(0) <= 32)
  )
    return ROUTES.DASHBOARD;
  try {
    const decoded = decodeURIComponent(from);
    if (
      decoded.startsWith('//') ||
      Array.from(decoded).some((char) => char === '\\' || char.charCodeAt(0) <= 32) ||
      decoded.split(/[?#]/)[0] === ROUTES.LOGIN
    )
      return ROUTES.DASHBOARD;
  } catch {
    return ROUTES.DASHBOARD;
  }
  return from;
}
