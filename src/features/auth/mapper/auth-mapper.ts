import { z } from 'zod';
import { ApiError } from '@/core/api/apiError';
import type { Identity } from '@/core/types/Identity';
import { loginSchema } from '@/features/auth/validation/auth-schema';
export function mapLoginInput(input: unknown) {
  return loginSchema.parse(input);
}
const safeIdSchema = z.number().int().positive().refine(Number.isSafeInteger);
const maskSchema = z
  .string()
  .regex(/^(0|[1-9][0-9]*)$/)
  .refine((value) => BigInt(value) < 1n << 64n);
const currentUserSchema = z.object({
  id: safeIdSchema,
  fullName: z.string(),
  username: z.string(),
  branchId: safeIdSchema,
  isActive: z.boolean(),
  permissions: z.array(z.object({ moduleCode: z.string().min(1), mask: maskSchema })),
});
export function mapCurrentUser(dto: unknown, sessionId?: string): Identity {
  const parsed = currentUserSchema.safeParse(dto);
  if (!parsed.success) throw Error('استجابة الحساب لا تطابق عقد تسجيل الدخول المعتمد.');
  const u = parsed.data;
  if (!u.isActive) throw new ApiError({ detail: 'الحساب غير نشط' }, 401);
  return {
    userId: String(u.id),
    username: u.username,
    displayName: u.fullName || u.username,
    fullName: u.fullName,
    email: '',
    branchId: String(u.branchId),
    permissions: u.permissions,
    sessionId,
  };
}
export function mapAuthResponse(dto: unknown) {
  return { user: mapCurrentUser(dto) };
}
export function mapSignInResponse(dto: unknown) {
  const parsed = z
    .object({
      user: z.unknown(),
      session: z.object({ id: z.string().uuid() }),
      expiresAtUtc: z.string().datetime({ offset: true }),
    })
    .safeParse(dto);
  if (!parsed.success) throw Error('استجابة تسجيل الدخول غير مكتملة.');
  return { user: mapCurrentUser(parsed.data.user, parsed.data.session.id) };
}
