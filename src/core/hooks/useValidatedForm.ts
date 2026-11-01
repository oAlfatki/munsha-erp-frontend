import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { ZodType, ZodTypeDef } from 'zod';
/** Form validation only. The supplied callback owns mutation delivery and server state. */
export function useValidatedForm<TInput>(
  formSchema: ZodType<Record<string, unknown>, ZodTypeDef, Record<string, unknown>>,
  save: (input: TInput) => Promise<boolean>,
) {
  const form = useForm<Record<string, unknown>>({ resolver: zodResolver(formSchema) });
  const submit = async (input: TInput) => {
    form.reset(input as Record<string, unknown>);
    let isSuccess = false;
    await form.handleSubmit(
      async (values) => {
        isSuccess = await save(values as TInput);
      },
      (errors) => {
        const messages: string[] = [];
        function collect(value: unknown) {
          if (!value || typeof value !== 'object') return;
          const record = value as Record<string, unknown>;
          if (typeof record.message === 'string') messages.push(record.message);
          else
            for (const [key, item] of Object.entries(record))
              if (!['ref', 'type', 'types'].includes(key)) collect(item);
        }
        collect(errors);
        toast.error([...new Set(messages)].join('\n') || 'راجع الحقول المطلوبة');
      },
    )();
    return isSuccess;
  };
  return { submit, form };
}
