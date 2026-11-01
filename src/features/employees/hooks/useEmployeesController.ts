import { useErpContext } from '@/core/hooks/useErpContext';
import { useValidatedForm } from '@/core/hooks/useValidatedForm';
import { today } from '@/core/utils/formatters';
import { newId } from '@/core/utils/id';
import { useEmployee } from '@/features/employees/hooks/useEmployee';
import { useEmployeeDelete } from '@/features/employees/hooks/useEmployeeDelete';
import type { Employee } from '@/features/employees/types/models/Employee';
import {
  employeeDeleteSchema,
  employeeSchema,
} from '@/features/employees/validation/employees-schema';
import { useState } from 'react';
import { toast } from 'sonner';
const fileData = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(Error('تعذر قراءة الملف'));
    r.readAsDataURL(file);
  });
export function useEmployeesController() {
  const { state: s, branchId, busy: isBusy, view, navigate } = useErpContext();
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
    currency: s!.organization.currency,
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
    [edit, setEdit] = useState<Employee | undefined>(() =>
      view === '/employees/new' ? blank() : undefined,
    ),
    [tab, setTab] = useState('basic'),
    [isDeleting, setDeleting] = useState(false);
  if (!s) return null;
  const list = s.employees.filter(
    (employee) =>
      employee.branchId === branchId &&
      [employee.name, employee.code, employee.phone, employee.job].join(' ').includes(searchQuery),
  );
  const handleClose = () => {
    setEdit(undefined);
    if (view === '/employees/new') navigate('/employees');
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
    s,
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
