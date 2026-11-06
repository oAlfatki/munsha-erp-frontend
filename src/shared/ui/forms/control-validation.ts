import { z } from 'zod';

/** Constraint-based schemas for shared controls; feature schemas validate the complete request. */

export function validateControl(
  value: unknown,
  attributes: Record<string, unknown>,
  label: string,
): true | string {

  const name = label.replace(/[*＊]/g, '').trim();
  if (attributes.disabled || attributes.type === 'file' || attributes.type === 'checkbox')
    return true;
  const text = String(value ?? '');
  if (!attributes.required && !text) return true;
  let controlSchema = z.string();
  if (attributes.required) controlSchema = controlSchema.trim().min(1, `${name} إجباري`);
  if (attributes.minLength)
    controlSchema = controlSchema.min(Number(attributes.minLength), `${name} أقصر من الحد المطلوب`);
  if (attributes.maxLength)
    controlSchema = controlSchema.max(Number(attributes.maxLength), `${name} يتجاوز الحد المسموح`);
  if (attributes.type === 'email')
    controlSchema = controlSchema.check(z.email('أدخل بريدًا إلكترونيًا صحيحًا'));
  if (attributes.pattern)
    controlSchema = controlSchema.regex(
      new RegExp(String(attributes.pattern)),
      `صيغة ${name} غير صحيحة`,
    );
  const result = controlSchema.safeParse(text);
  if (!result.success) return result.error.issues[0].message;
  if (attributes.type === 'number') {
    let numberSchema = z.number({
      error: (issue) =>
        issue.input === Infinity || issue.input === -Infinity
          ? `أدخل رقمًا صحيحًا في ${name}`
          : undefined,
    });
    if (attributes.min !== undefined)
      numberSchema = numberSchema.min(
        Number(attributes.min),
        `${name} يجب ألا يقل عن ${attributes.min}`,
      );
    if (attributes.max !== undefined)
      numberSchema = numberSchema.max(
        Number(attributes.max),
        `${name} يجب ألا يزيد عن ${attributes.max}`,
      );
    const parsed = numberSchema.safeParse(text.trim() ? Number(text) : NaN);
    if (!parsed.success) return parsed.error.issues[0].message;
  }
  return true;
}
