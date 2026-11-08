import type { UserFormValues } from '@/features/users/types/UserFormValues';
import type { UseFormReturn } from 'react-hook-form';

export interface UserFormFieldsProps {
  form: UseFormReturn<UserFormValues>;
  isEditing: boolean;
}
