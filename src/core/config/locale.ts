/** The application has one supported language. API identifiers remain unchanged. */
export const APP_LOCALE = 'ar';
if (typeof document !== 'undefined') {
  document.documentElement.lang = APP_LOCALE;
  document.documentElement.dir = 'rtl';
}
