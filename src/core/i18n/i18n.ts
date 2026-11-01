import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
export const LANGUAGE_STORAGE_KEY='munsha-language';
void i18n.use(initReactI18next).init({lng:typeof localStorage==='undefined'?'ar':localStorage.getItem(LANGUAGE_STORAGE_KEY)||'ar',fallbackLng:'ar',interpolation:{escapeValue:false},resources:{ar:{translation:{loading:'جارٍ التحميل…',retry:'إعادة المحاولة',empty:'لا توجد بيانات',language:'English',notFound:'الصفحة غير موجودة'}},en:{translation:{loading:'Loading…',retry:'Retry',empty:'No data',language:'العربية',notFound:'Page not found'}}}});
export function syncDocumentLanguage(language:string){document.documentElement.lang=language;document.documentElement.dir=language.startsWith('ar')?'rtl':'ltr';localStorage.setItem(LANGUAGE_STORAGE_KEY,language);}
if(typeof document!=='undefined'){syncDocumentLanguage(i18n.language||'ar');i18n.on('languageChanged',syncDocumentLanguage);}
export default i18n;
