import { authApi,fetchAccount } from '@/features/auth/api/auth-api';
import { mapAuthResponse,mapLoginInput } from '@/features/auth/mapper/auth-mapper';
export const getAccount=async()=>mapAuthResponse(await fetchAccount());
export const login=(input:unknown)=>authApi.login(mapLoginInput(input));
