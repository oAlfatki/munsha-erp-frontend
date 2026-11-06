import type { FieldError } from '@/core/types/api/FieldError';

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  code?: string;
  traceId?: string;
  errors?: Record<string, string[]> | FieldError[];
}
