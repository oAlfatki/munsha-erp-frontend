import { authApi, fetchAccount } from '@/features/auth/api/auth-api';
import {
  mapAuthResponse,
  mapLoginInput,
  mapSignInResponse,
} from '@/features/auth/mappers/auth-mapper';
export const getAccount = async (signal?: AbortSignal) =>
  mapAuthResponse(await fetchAccount(signal));
export const login = async (input: unknown) =>
  mapSignInResponse(await authApi.login(mapLoginInput(input)));
