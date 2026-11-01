import type { LoginRequest } from '@/features/auth/types/requests/LoginRequest';
import type { AuthResponse } from '@/features/auth/types/responses/AuthResponse';
import { loginSchema } from '@/features/auth/validation/auth-schema';
export function mapLoginInput(input: unknown): LoginRequest {
  return loginSchema.parse(input);
}
export function mapAuthResponse(dto: AuthResponse): AuthResponse {
  return {
    ...dto,
    user: { ...dto.user, displayName: dto.user.displayName || dto.user.fullName || '' },
    users: dto.users || [],
    sessions: dto.sessions || [],
  };
}
