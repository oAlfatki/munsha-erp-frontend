import { useTranslation } from 'react-i18next';
export function LanguageSwitch() {
  const { t, i18n } = useTranslation();
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={t('changeLanguage')}
      onClick={() => void i18n.changeLanguage(i18n.language.startsWith('ar') ? 'en' : 'ar')}
    >
      {t('language')}
    </button>
  );
}
