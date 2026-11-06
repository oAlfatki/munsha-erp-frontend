import { useEffect } from 'react';

const FIELDS =
  'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="image"]), select, textarea';

/** Keep data entry in DOM order (right-to-left in the Arabic forms).
 * At the edges, leave Tab to the browser so actions and dialog controls stay reachable.
 */

export function FieldNavigation() {

  useEffect(() => {
    const navigate = (event: KeyboardEvent) => {

      if (
        event.key !== 'Tab' ||
        event.defaultPrevented ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
      )
        return;
      const current = event.target;
      if (!(current instanceof HTMLElement) || !current.matches(FIELDS)) return;
      const scope =
        current.closest('[role="dialog"], [role="alertdialog"]') ||
        current.closest('form') ||
        current.closest('.workspace-content') ||
        current.closest('main');
      if (!scope) return;
      const controls = Array.from(scope.querySelectorAll<HTMLElement>(FIELDS)).filter(
        (control) =>
          !control.matches(':disabled') &&
          !('readOnly' in control && control.readOnly) &&
          control.tabIndex >= 0 &&
          !control.closest('[hidden], [inert], [aria-hidden="true"]') &&
          control.getClientRects().length > 0 &&
          getComputedStyle(control).visibility !== 'hidden',
      );
      const index = controls.indexOf(current);
      if (index < 0) return;
      const next = controls[index + (event.shiftKey ? -1 : 1)];
      if (next) {
        event.preventDefault();
        next.focus();
      }
    };

    document.addEventListener('keydown', navigate);
    return () => document.removeEventListener('keydown', navigate);
  }, []);
  return null;
}
