/** Shared type-error wording only; feature schemas still own every validation rule. */
export function fieldTypeError(required?: string, invalid?: string) {

  return (issue: { input?: unknown }) => (issue.input === undefined ? required : invalid);
}

/** Preserve finite-number wording while retaining the validation runtime's type guard. */
export function finiteTypeError(
  required: string | undefined,
  invalid: string | undefined,
  nonFinite: string,
) {

  const fallback = fieldTypeError(required, invalid);
  return (issue: { input?: unknown }) =>
    issue.input === Infinity || issue.input === -Infinity ? nonFinite : fallback(issue);
}
