import { useAuth } from '@/core/auth/AuthProvider';
import { ROUTES } from '@/core/config/navigation-paths';
import { usersApi } from '@/features/users/api/users-api';
import { useUsersQuery } from '@/features/users/queries/users-query';
import { resetPasswordSchema } from '@/features/users/validation/user-form-schema';
import { Modal } from '@/shared/ui/dialogs/Modal';
import { Field } from '@/shared/ui/forms/Field';
import { PageHead } from '@/shared/ui/layout/PageHead';
import { Button } from '@/shared/ui/primitives/button';
import { Input } from '@/shared/ui/primitives/input';
import { DataTable } from '@/shared/ui/tables/DataTable';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AccessRules } from './AccessRules';
const ROLES={admin:'مسؤول النظام',staff:'مستخدم عمليات',viewer:'مشاهدة فقط'};
export function UserDirectory(){const {user}=useAuth(),query=useUsersQuery(),navigate=useNavigate(),cache=useQueryClient();const [reset,setReset]=useState<{id:string;name:string}|null>(null);const [message,setMessage]=useState('');const form=useForm<{id:string;password:string}>({resolver:zodResolver(resetPasswordSchema)});const mutation=useMutation({mutationFn:usersApi.resetPassword,onSuccess:async()=>{setReset(null);form.reset();setMessage('أُعيد تعيين كلمة المرور وأُنهيت الجلسات.');await cache.invalidateQueries({queryKey:['erp','users']});}});return <><PageHead title="المستخدمون" description="حسابات الدخول المستقلة وحالة الحساب ونوع الصلاحية." extra={user?.role==='admin'?<Button onClick={()=>navigate(ROUTES.USERS_NEW)}>إضافة مستخدم</Button>:undefined}/><AccessRules/>{message&&<p role="status" className="info-note">{message}</p>}{query.error&&<p role="alert">{query.error.message}</p>}{user?.role!=='admin'?<p className="info-note">إدارة حسابات المستخدمين متاحة لمسؤول النظام. استخدم «تغيير كلمة المرور» و«الجلسات» لإدارة حسابك.</p>:query.isPending?<p role="status">جارٍ تحميل المستخدمين…</p>:<DataTable headers={['الاسم','اسم الدخول','الصلاحية','الحالة','كلمة المرور','الإجراءات']} rows={(query.data?.items||[]).map(u=>[u.name,u.username,ROLES[u.role]||u.role,u.active?'نشط':'معطّل',u.must_change?'يلزم تغييرها':'محدثة',<div className="flex gap-2" key={u.id}><Button variant="outline" onClick={()=>navigate('/users/'+encodeURIComponent(u.id)+'/edit')}>عرض وتعديل</Button><Button variant="ghost" onClick={()=>{setReset(u);form.reset({id:u.id,password:''});}}>إعادة تعيين كلمة المرور</Button></div>])}/>} {reset&&<Modal isOpen title={'إعادة تعيين كلمة المرور — '+reset.name} onClose={()=>setReset(null)}><p className="info-note">تنتهي جميع جلسات هذا المستخدم فورًا. عليه تغيير كلمة المرور المؤقتة في أول دخول.</p><form noValidate onSubmit={form.handleSubmit(values=>mutation.mutateAsync(values).catch(()=>{}))}><input type="hidden" {...form.register('id')}/><Field label="كلمة المرور المؤقتة الجديدة *"><Input type="password" autoComplete="new-password" {...form.register('password')}/></Field>{form.formState.errors.password&&<p role="alert">{form.formState.errors.password.message}</p>}{mutation.error&&<p role="alert">{mutation.error.message}</p>}<Button disabled={mutation.isPending}>تأكيد إعادة التعيين</Button></form></Modal>}</>;}
