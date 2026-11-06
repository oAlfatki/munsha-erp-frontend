import type { Validatable } from '@/shared/types/forms/Validatable';
import type { FieldProps } from '@/shared/types/props/FieldProps';
import { validateControl } from '@/shared/ui/forms/control-validation';
import { Select } from '@/shared/ui/forms/Select';
import { fieldError } from '@/shared/ui/forms/ValidatedForm';
import { Input } from '@/shared/ui/primitives/input';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export function Field({ label, children, isFullWidth: isSpan = false }: FieldProps) {

  const [error, setError] = useState(''),
    errorId = React.useId();
  const form = useFormContext<Record<string, unknown>>();
  const isRequired =
    /[*＊]/.test(label) ||
    React.Children.toArray(children).some(
      (child) => React.isValidElement<{ required?: boolean }>(child) && child.props.required,
    );
  const controls = React.Children.map(children, (child, index) => {
    if (
      !React.isValidElement<Record<string, unknown>>(child) ||
      !(
        ['input', 'select', 'textarea'].includes(String(child.type)) ||
        child.type === Input ||
        child.type === Select
      )
    )
      return child;
    const controlName = String(
      child.props.name || 'field-' + errorId.replaceAll(':', '') + '-' + index,
    );
    const attrs = { ...child.props, required: isRequired || child.props.required };
    const binding = form?.register(controlName, {
      validate: (value) => validateControl(value, attrs, label),
    });
    const originalChange = child.props.onChange as
      | ((e: React.ChangeEvent<HTMLInputElement>) => void)
      | undefined;
    const originalBlur = child.props.onBlur as
      | ((e: React.FocusEvent<HTMLInputElement>) => void)
      | undefined;
    return React.cloneElement(child, {
      ...(binding
        ? {
            ...binding,

            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {

              originalChange?.(e);
              void binding.onChange(e);
            },

            onBlur: (e: React.FocusEvent<HTMLInputElement>) => {

              originalBlur?.(e);
              void binding.onBlur(e);
            },
          }
        : {}),
      'aria-label': child.props['aria-label'] || label.replace(/[*＊]/g, '').trim(),
      'aria-invalid': !!error || child.props['aria-invalid'],
      'aria-describedby':
        [child.props['aria-describedby'], error ? errorId : ''].filter(Boolean).join(' ') ||
        undefined,
      ...(isRequired ? { required: true } : {}),
    });
  });

  const inspect = (e: React.SyntheticEvent) => {

    const el = e.target as unknown as Validatable;
    if (!el.validity) return;
    const message = fieldError(el, label);
    setError(message);
  };

  return (
    <label
      className={'field ' + (isSpan ? 'col-span-full' : '')}
      onInvalidCapture={(e) => {
        e.preventDefault();
        inspect(e);
      }}
      onInputCapture={(e) => {
        const el = e.target as unknown as Validatable;
        el.setCustomValidity?.('');
        if (error) inspect(e);
      }}
      onChangeCapture={(e) => {
        const el = e.target as unknown as Validatable;
        el.setCustomValidity?.('');
        if (error) inspect(e);
      }}
    >
      <span>
        {label.split(/([*＊])/).map((part, index) =>
          part === '*' || part === '＊' ? (
            <span key={index} className="required-star">
              {part}
            </span>
          ) : (
            part
          ),
        )}
        {isRequired && !/[*＊]/.test(label) && <span className="required-star"> *</span>}
      </span>
      {controls}
      {error && (
        <small id={errorId} className="field-error" role="alert">
          {error}
        </small>
      )}
    </label>
  );
}
