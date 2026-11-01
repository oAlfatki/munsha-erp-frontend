import { authAction } from '@/features/auth/api/auth-api';
export async function authRequest(data: { action: string; [key: string]: unknown }) {
  const result = await authAction(data);

  if (result.relogin) window.location.href = '/login';
  return result;
}
