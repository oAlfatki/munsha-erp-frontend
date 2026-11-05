import { z } from 'zod';
export const employeeSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .optional(),
    name: z
      .string({ required_error: 'الاسم مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الاسم' })
      .min(1, 'الاسم يجب ألا يقل عن 1')
      .max(180, 'الاسم يجب ألا يزيد عن 180'),
    phone: z
      .string({
        required_error: 'رقم الهاتف مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في رقم الهاتف',
      })
      .max(40, 'رقم الهاتف يجب ألا يزيد عن 40'),
    address: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(200, 'القيمة المدخلة يجب ألا يزيد عن 200'),
    email: z
      .string({
        required_error: 'البريد الإلكتروني مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في البريد الإلكتروني',
      })
      .max(150, 'البريد الإلكتروني يجب ألا يزيد عن 150'),
    job: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
      .max(180, 'القيمة المدخلة يجب ألا يزيد عن 180'),
    branchId: z
      .string({ required_error: 'الفرع مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في الفرع' })
      .min(1, 'الفرع يجب ألا يقل عن 1')
      .max(180, 'الفرع يجب ألا يزيد عن 180'),
    salary: z.preprocess(
      (v) => (typeof v === 'string' && v.trim() !== '' ? Number(v) : v),
      z
        .number({
          required_error: 'القيمة المدخلة مطلوب',
          invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
        })
        .finite('أدخل قيمة صحيحة في القيمة المدخلة')
        .min(0, 'القيمة المدخلة يجب ألا يقل عن 0'),
    ),
    currency: z
      .string({ required_error: 'العملة مطلوب', invalid_type_error: 'أدخل قيمة صحيحة في العملة' })
      .min(1, 'العملة يجب ألا يقل عن 1')
      .max(180, 'العملة يجب ألا يزيد عن 180'),
    joined: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة القيمة المدخلة غير صحيحة'),
    identity: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(80, 'القيمة المدخلة يجب ألا يزيد عن 80'),
    issuer: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(120, 'القيمة المدخلة يجب ألا يزيد عن 120'),
    marital: z
      .enum(['', 'single', 'married', 'divorced', 'widowed'], {
        errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
      })
      .optional(),
    issueDate: z
      .union([
        z
          .string({
            required_error: 'القيمة المدخلة مطلوب',
            invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
          })
          .regex(new RegExp('^\\d{4}-\\d{2}-\\d{2}$'), 'صيغة القيمة المدخلة غير صحيحة'),
        z.literal(''),
      ])
      .optional(),
    photo: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .max(110000, 'القيمة المدخلة يجب ألا يزيد عن 110000')
      .optional(),
    files: z
      .array(
        z
          .object({
            id: z
              .string({
                required_error: 'القيمة المدخلة مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
              })
              .min(1, 'القيمة المدخلة يجب ألا يقل عن 1')
              .max(80, 'القيمة المدخلة يجب ألا يزيد عن 80'),
            name: z
              .string({
                required_error: 'الاسم مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في الاسم',
              })
              .min(1, 'الاسم يجب ألا يقل عن 1')
              .max(160, 'الاسم يجب ألا يزيد عن 160'),
            type: z.enum(['application/pdf', 'image/png', 'image/jpeg'], {
              errorMap: () => ({ message: 'اختر قيمة صحيحة في القيمة المدخلة' }),
            }),
            data: z
              .string({
                required_error: 'القيمة المدخلة مطلوب',
                invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
              })
              .max(110000, 'القيمة المدخلة يجب ألا يزيد عن 110000')
              .regex(new RegExp('^[A-Za-z0-9+/]+={0,2}$'), 'صيغة القيمة المدخلة غير صحيحة'),
          })
          .passthrough(),
      )
      .max(3, 'القيمة المدخلة يجب ألا يزيد عن 3')
      .optional(),
    active: z.boolean({
      required_error: 'القيمة المدخلة مطلوب',
      invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
    }),
  })
  .passthrough();
export const employeeDeleteSchema = z
  .object({
    id: z
      .string({
        required_error: 'القيمة المدخلة مطلوب',
        invalid_type_error: 'أدخل قيمة صحيحة في القيمة المدخلة',
      })
      .min(1, 'القيمة المدخلة يجب ألا يقل عن 1'),
  })
  .passthrough();
