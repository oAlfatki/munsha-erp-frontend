import type { CurrencyWords } from '@/core/types/CurrencyWords';
import { money } from '@/core/utils/money';
const ONES = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
const TEENS = [
  'عشرة',
  'أحد عشر',
  'اثنا عشر',
  'ثلاثة عشر',
  'أربعة عشر',
  'خمسة عشر',
  'ستة عشر',
  'سبعة عشر',
  'ثمانية عشر',
  'تسعة عشر',
];
const TENS = ['', '', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
function below100(n: number): string {
  if (n < 10) return ONES[n];
  if (n < 20) return TEENS[n - 10];
  return [ONES[n % 10], TENS[Math.floor(n / 10)]].filter(Boolean).join(' و');
}
function below1000(n: number): string {
  const h = Math.floor(n / 100),
    rest = n % 100;
  const hundreds = [
    '',
    'مئة',
    'مئتان',
    'ثلاثمئة',
    'أربعمئة',
    'خمسمئة',
    'ستمئة',
    'سبعمئة',
    'ثمانمئة',
    'تسعمئة',
  ];
  return [hundreds[h], below100(rest)].filter(Boolean).join(' و');
}
export function arabicNumber(n: number): string {
  if (!Number.isSafeInteger(n) || n < 0 || n >= 1e12) throw Error('القيمة خارج نطاق التفقيط');
  if (n === 0) return 'صفر';
  const scales = [
    ['', '', ''],
    ['ألف', 'ألفان', 'آلاف'],
    ['مليون', 'مليونان', 'ملايين'],
    ['مليار', 'ملياران', 'مليارات'],
  ];
  const parts: string[] = [];
  let i = 0;
  while (n) {
    const g = n % 1000;
    if (g) {
      const scale = scales[i];
      parts.unshift(
        i === 0
          ? below1000(g)
          : g === 1
            ? scale[0]
            : g === 2
              ? scale[1]
              : below1000(g) + ' ' + (g >= 3 && g <= 10 ? scale[2] : scale[0]),
      );
    }
    n = Math.floor(n / 1000);
    i++;
  }
  return parts.join(' و');
}

const CURRENCIES: Record<string, CurrencyWords> = {
  YER: {
    singular: 'ريال يمني',
    dual: 'ريالان يمنيان',
    plural: 'ريالات يمنية',
    fraction: 'فلس',
    fractionDual: 'فلسان',
    fractionPlural: 'فلوس',
  },
  SAR: {
    singular: 'ريال سعودي',
    dual: 'ريالان سعوديان',
    plural: 'ريالات سعودية',
    fraction: 'هللة',
    fractionDual: 'هللتان',
    fractionPlural: 'هللات',
  },
  USD: {
    singular: 'دولار أمريكي',
    dual: 'دولاران أمريكيان',
    plural: 'دولارات أمريكية',
    fraction: 'سنت',
    fractionDual: 'سنتان',
    fractionPlural: 'سنتات',
  },
};
function counted(n: number, singular: string, dual: string, plural: string) {
  if (n === 1) return singular + ' واحد';
  if (n === 2) return dual;
  return arabicNumber(n) + ' ' + (n % 100 >= 3 && n % 100 <= 10 ? plural : singular);
}
export function amountInWords(amount: number, currency = 'YER'): string {
  if (!Number.isFinite(amount) || Math.abs(amount) >= 1e10) return 'المبلغ خارج نطاق التفقيط';
  const cents = Math.round(Math.abs(money(amount)) * 100),
    whole = Math.floor(cents / 100),
    fraction = cents % 100,
    c = CURRENCIES[currency];
  if (!c)
    return `فقط ${amount < 0 ? 'سالب ' : ''}${arabicNumber(whole)} وحدة من ${currency}${fraction ? ' و' + arabicNumber(fraction) + ' جزءًا من مئة' : ''} لا غير`;
  let main = counted(whole, c.singular, c.dual, c.plural);
  if (whole % 100 >= 11 && whole % 100 <= 99)
    main = main.replace(
      c.singular,
      (
        { YER: 'ريالًا يمنيًا', SAR: 'ريالًا سعوديًا', USD: 'دولارًا أمريكيًا' } as Record<
          string,
          string
        >
      )[currency],
    );
  let minor = fraction ? counted(fraction, c.fraction, c.fractionDual, c.fractionPlural) : '';
  if (currency === 'SAR' && fraction) {
    const fem = ['', 'واحدة', 'اثنتان', 'ثلاث', 'أربع', 'خمس', 'ست', 'سبع', 'ثمان', 'تسع'];
    const word =
      fraction < 10
        ? fem[fraction]
        : fraction === 10
          ? 'عشر'
          : fraction === 11
            ? 'إحدى عشرة'
            : fraction === 12
              ? 'اثنتا عشرة'
              : fraction < 20
                ? fem[fraction - 10] + ' عشرة'
                : [
                    fraction % 10 === 1
                      ? 'إحدى'
                      : fraction % 10 === 2
                        ? 'اثنتان'
                        : fem[fraction % 10],
                    TENS[Math.floor(fraction / 10)],
                  ]
                    .filter(Boolean)
                    .join(' و');
    minor =
      fraction === 1
        ? 'هللة واحدة'
        : fraction === 2
          ? 'هللتان'
          : word + ' ' + (fraction >= 3 && fraction <= 10 ? 'هللات' : 'هللة');
  }
  return (
    'فقط ' +
    (amount < 0 && cents ? 'سالب ' : '') +
    [main, minor].filter(Boolean).join(' و') +
    ' لا غير'
  );
}
