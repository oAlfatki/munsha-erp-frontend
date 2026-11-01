import { authAction, fetchAccount } from '@/features/auth/api/auth-api';
import { mapAuthResponse, mapLoginInput } from '@/features/auth/mapper/auth-mapper';
export const getAccount = async (): Promise<Awaited<ReturnType<typeof mapAuthResponse>>> =>
  mapAuthResponse(await fetchAccount());
export const login = async (input: unknown): Promise<Awaited<ReturnType<typeof authAction>>> =>
  authAction({ action: 'login', ...mapLoginInput(input) });
