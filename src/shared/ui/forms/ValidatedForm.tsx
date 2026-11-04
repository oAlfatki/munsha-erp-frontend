import type { Validatable } from '@/core/types/Validatable';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider,useForm } from 'react-hook-form';
import { z } from 'zod';
import { validateControl } from './control-validation';

export function fieldError(input: Validatable, label: string) {
  const name = label.replace(/[*＊]/g, '').trim() || 'هذا الحقل',
    v = input.validity;
  if (v.valueMissing || (input.required && !input.value.trim())) return `${name} إجباري`;
  if (v.typeMismatch)
    return input.type === 'email' ? 'أدخل بريدًا إلكترونيًا صحيحًا' : `أدخل قيمة صحيحة في ${name}`;
  if (v.badInput) return `أدخل رقمًا صحيحًا في ${name}`;
  if (v.rangeUnderflow) return `${name} يجب ألا يقل عن ${input.getAttribute('min')}`;
  if (v.rangeOverflow) return `${name} يجب ألا يزيد عن ${input.getAttribute('max')}`;
  if (v.tooShort) return `${name} يجب ألا يقل عن ${input.getAttribute('minlength')} أحرف`;
  if (v.tooLong) return `${name} يتجاوز الحد المسموح`;
  if (v.patternMismatch) return `صيغة ${name} غير صحيحة`;
  if (v.stepMismatch)
    return `أدخل قيمة متوافقة مع الزيادة ${input.getAttribute('step')} في ${name}`;
  return v.valid ? '' : `راجع ${name}`;
}
export function validateForm(form: HTMLFormElement | HTMLElement) {
  let first: Validatable | undefined;
  for (const control of Array.from(
    form instanceof HTMLFormElement
      ? form.elements
      : form.querySelectorAll('input,select,textarea'),
  )) {
    if (
      !(
        control instanceof HTMLInputElement ||
        control instanceof HTMLSelectElement ||
        control instanceof HTMLTextAreaElement
      ) ||
      !control.willValidate
    )
      continue;
    if (control.validity.customError) control.setCustomValidity('');
    if (control.required && !control.value.trim()) control.setCustomValidity('required');
    if (!control.checkValidity()) first ??= control;
  }
  first?.focus();
  return !first;
}
export function Form({
  onSubmit,
  onSubmitCapture,
  children,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  const [errors, setErrors] = React.useState<string[]>([]);
  const formRef = React.useRef<HTMLFormElement>(null);
  const formSchema = z.record(z.unknown()).superRefine((values, ctx) => {
    for (const control of Array.from(formRef.current?.elements || [])) {
      if (
        !(
          control instanceof HTMLInputElement ||
          control instanceof HTMLSelectElement ||
          control instanceof HTMLTextAreaElement
        ) ||
        !control.name ||
        !(control.name in values) ||
        control.disabled
      )
        continue;
      const label =
        control.getAttribute('aria-label') ||
        control.closest('.field')?.querySelector('span')?.textContent ||
        'هذا الحقل';
      const result = validateControl(
        values[control.name],
        {
          required: control.required,
          type: control.type,
          min: control.getAttribute('min') ?? undefined,
          max: control.getAttribute('max') ?? undefined,
          minLength: control.getAttribute('minlength'),
          maxLength: control.getAttribute('maxlength'),
          pattern: control.getAttribute('pattern'),
        },
        label,
      );
      if (result !== true) ctx.addIssue({ code: 'custom', path: [control.name], message: result });
    }
  });
  const methods = useForm<Record<string, unknown>>({
    mode: 'onBlur',
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
  });
  return (
    <FormProvider {...methods}>
      <form
        {...props}
        ref={formRef}
        noValidate
        onInvalidCapture={(e) => {
          e.preventDefault();
          const el = e.target as Validatable;
          if (!el.closest('.field'))
            setErrors((v) => [
              ...new Set([...v, fieldError(el, el.getAttribute('aria-label') || 'هذا الحقل')]),
            ]);
        }}
        onInputCapture={(e) => {
          (e.target as Validatable).setCustomValidity?.('');
          setErrors([]);
        }}
        onSubmitCapture={(e) => {
          setErrors([]);
          if (!validateForm(e.currentTarget)) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onSubmitCapture?.(e);
        }}
        onSubmit={(event) => {
          const element = event.currentTarget;
          const stable = Object.create(event) as typeof event;
          Object.defineProperty(stable, 'currentTarget', { value: element });
          void methods.handleSubmit(
            () => onSubmit?.(stable),
            (invalid) => {
              setErrors(
                Object.values(invalid).map((error) =>
                  String(error?.message || 'راجع الحقول المطلوبة'),
                ),
              );
            },
          )(event);
        }}
      >
        {children}
        {errors.length > 0 && (
          <div className="field-error" role="alert">
            {errors.map((v) => (
              <p key={v}>{v}</p>
            ))}
          </div>
        )}
      </form>
    </FormProvider>
  );
}
