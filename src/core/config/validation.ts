import { z } from 'zod';

/** Fallback for union/root/type errors; feature-specific Arabic messages take precedence. */

z.config({
  customError: (issue) => ({
    message:
      issue.code === 'invalid_type' && issue.input === undefined
        ? 'هذا الحقل مطلوب'
        : issue.code === 'invalid_value'
          ? 'اختر قيمة صحيحة من القائمة'
          : issue.code === 'invalid_union'
            ? 'راجع القيم والحقول المترابطة'
            : 'القيمة المدخلة غير صالحة',
  }),
});
