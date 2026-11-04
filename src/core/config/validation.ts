import { z,type ZodErrorMap } from 'zod';
/** Fallback for union/root/type errors; feature-specific Arabic messages take precedence. */
const arabicErrorMap: ZodErrorMap = (issue) => ({
  message:
    issue.code === 'invalid_type' && issue.received === 'undefined'
      ? 'هذا الحقل مطلوب'
      : issue.code === 'invalid_enum_value'
        ? 'اختر قيمة صحيحة من القائمة'
        : issue.code === 'invalid_union'
          ? 'راجع القيم والحقول المترابطة'
          : 'القيمة المدخلة غير صالحة',
});
z.setErrorMap(arabicErrorMap);
