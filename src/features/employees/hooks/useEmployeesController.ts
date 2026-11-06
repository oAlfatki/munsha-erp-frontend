import { ROUTES } from '@/core/config/navigation-paths';

import { today } from '@/core/utils/formatters';
import { newId } from '@/core/utils/id';
import { useEmployee } from '@/features/employees/hooks/useEmployee';
import { useEmployeeDelete } from '@/features/employees/hooks/useEmployeeDelete';
import { useEmployeesControllerQuery } from '@/features/employees/queries/useEmployeesControllerQuery';
import {
  employeeDeleteSchema,
  employeeSchema,
} from '@/features/employees/validations/employees-schema';
import type { Employee } from '@/features/personnel/public';
import { useValidatedForm } from '@/shared/hooks/useValidatedForm';
import { useState } from 'react';
import { toast } from 'sonner';

const fileData = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(Error('تعذر قراءة الملف'));
    r.readAsDataURL(file);
  });

export function useEmployeesController(isInitialCreate = false) {

  const { state, branchId, busy: isBusy, navigate } = useEmployeesControllerQuery();
  const employeeMutationRequest = useEmployee(),
    employeeForm = useValidatedForm(employeeSchema, employeeMutationRequest.execute),
    employeeMutation = { ...employeeMutationRequest, execute: employeeForm.submit };
  const employeeDeleteMutationRequest = useEmployeeDelete(),
    employeeDeleteForm = useValidatedForm(
      employeeDeleteSchema,
      employeeDeleteMutationRequest.execute,
    ),
    employeeDeleteMutation = {
      ...employeeDeleteMutationRequest,
      execute: employeeDeleteForm.submit,
    };

  const blank = (): Employee => ({
    id: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    job: '',
    branchId,
    salary: 0,
    currency: state!.organization.currency,
    joined: today(),
    identity: '',
    issuer: '',
    issueDate: '',
    marital: '',
    active: true,
    photo: '',
    files: [],
  });

  const [searchQuery, setQ] = useState(''),
    [edit, setEdit] = useState<Employee | undefined>(() => (isInitialCreate ? blank() : undefined)),
    [tab, setTab] = useState('basic'),
    [isDeleting, setDeleting] = useState(false);
  if (!state) return null;
  const list = state.employees.filter(
    (employee) =>
      employee.branchId === branchId &&
      [employee.name, employee.code, employee.phone, employee.job].join(' ').includes(searchQuery),
  );

  const handleClose = () => {

    setEdit(undefined);
    if (isInitialCreate) navigate(ROUTES.EMPLOYEES);
  };

  const upload = async (file: File | undefined, isPhoto: boolean) => {

    if (!file || !edit) return;
    try {
      if (file.size > 80000) throw Error('الحد 80KB للملف في النسخة الأولية');
      if (
        !(
          isPhoto ? ['image/png', 'image/jpeg'] : ['image/png', 'image/jpeg', 'application/pdf']
        ).includes(file.type)
      )
        throw Error('ملف PNG أو JPEG أو PDF فقط؛ الصورة PNG أو JPEG');
      const data = await fileData(file);
      if (isPhoto) setEdit({ ...edit, photo: data });
      else {
        if ((edit.files || []).length >= 3) throw Error('الحد ثلاثة مرفقات للموظف');
        setEdit({
          ...edit,
          files: [
            ...(edit.files || []),
            {
              id: newId(),
              name: file.name,
              type: file.type as 'application/pdf' | 'image/png' | 'image/jpeg',
              data: data.split(',')[1],
            },
          ],
        });
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'تعذر قراءة الملف');
    }
  };

  const download = (f: NonNullable<Employee['files']>[number]) => {

    const bytes = Uint8Array.from(atob(f.data), (c) => c.charCodeAt(0)),
      url = URL.createObjectURL(new Blob([bytes], { type: f.type }));
    const a = document.createElement('a');
    a.href = url;
    a.download = f.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return {
    s: state,
    branchId,
    isBusy,
    employeeMutation,
    employeeDeleteMutation,
    blank,
    searchQuery,
    setQ,
    edit,
    setEdit,
    tab,
    setTab,
    isDeleting,
    setDeleting,
    list,
    handleClose,
    upload,
    download,
  };
}
