import { useApplication } from '@/core/providers/ApplicationProvider';
import type { CommandContext } from '@/core/types/CommandContext';
import type { CommandReceipt } from '@/core/types/CommandReceipt';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { ZodError } from 'zod';
/** Shared delivery/cache coordination; validation and business ownership stay in the feature service. */
export function useCommandMutation<TInput>(
  type: string,
  service: (input: TInput, context: CommandContext) => Promise<CommandReceipt>,
  validate?: (input: TInput) => void,
) {
  const { runCommand, busy: isBusy } = useApplication();
  const execute = useCallback(
    async (input: TInput) => {
      try {
        validate?.(input);
        return await runCommand(type, input, service);
      } catch (error) {
        toast.error(
          error instanceof ZodError
            ? error.issues.map((issue) => issue.message).join('\n')
            : error instanceof Error
              ? error.message
              : 'راجع بيانات العملية',
        );
        return false;
      }
    },
    [runCommand, type, service, validate],
  );
  return { execute, isPending: isBusy };
}
