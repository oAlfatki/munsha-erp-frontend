import type { ProblemDetails } from '@/core/types/api/ProblemDetails';
import type { FieldError } from '@/core/types/forms/FieldError';
export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly errors: FieldError[];
  readonly traceId?: string;
  constructor(problem: ProblemDetails, status: number) {
    super(problem.detail || problem.title || 'تعذر الاتصال بالخادم');
    this.name = 'ApiError';
    this.status = status;
    this.code = problem.code;
    this.traceId = problem.traceId;
    this.errors = Array.isArray(problem.errors)
      ? problem.errors
      : Object.entries(problem.errors || {}).flatMap(([key, details]) =>
          details.map((detail) => ({ pointer: '/' + key.replaceAll('.', '/'), detail })),
        );
  }
}
