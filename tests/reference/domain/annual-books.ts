import {carryCounters} from './numbering';
import {systemSettings} from './system-settings';
import {newId} from './id';
import {defaultCashId,cashOptions} from './cash';
import { z } from 'zod';
import { Workspace, JournalLine, money } from './types';
import { allAccounts, extras } from './extensions';

export type BookState = Omit<Workspace,'annualBooks'>;
export interface AnnualBook { id:string; name:string; year:number; status:'current'|'preparing'|'closed'; sourceId?:string; sourceVersion?:number; stockDone?:boolean; accountsDone?:boolean; state?:BookState; }
export interface AnnualBooks { activeId:string; books:AnnualBook[]; }
export function bookCatalog(workspace:Workspace):AnnualBooks { return workspace.annualBooks||{activeId:'main',books:[{id:'main',name:'السنة المالية '+workspace.organization.year,year:workspace.organization.year,status:'current'}]}; }
export const isArchived=(workspace:Workspace)=>bookCatalog(workspace).books.find(b=>b.id===bookCatalog(workspace).activeId)?.status==='closed';
const snapshot=(workspace:Workspace):BookState=>{const {annualBooks,...data}=structuredClone(workspace);return data;};
const requireValue=(value:unknown,message:string)=>{if(!value)throw Error(message);};
function replaceState(workspace:Workspace,next:BookState){for(const key of Object.keys(workspace))if(key!=='annualBooks')delete (workspace as unknown as Record<string,unknown>)[key];Object.assign(workspace,structuredClone(next));}
export function stockClosing(workspace:Workspace,date:string,branchId='',warehouseId=''){
 return workspace.products.flatMap(product=>workspace.warehouses.filter(warehouse=>(!branchId||warehouse.branchId===branchId)&&(!warehouseId||warehouse.id===warehouseId)).flatMap(w=>{
  const ms=workspace.movements.filter(m=>m.productId===product.id&&m.warehouseId===w.id&&m.date<=date);
  const qty=+ms.reduce((n,m)=>n+m.qty,0).toFixed(6),value=+ms.reduce((n,m)=>n+m.value,0).toFixed(6);
  return qty||value?[{productId:product.id,warehouseId:w.id,branchId:w.branchId,code:product.code,name:product.name,qty,unit:product.units.at(-1)!.name,warehouse:w.name,average:qty?value/qty:0,value}]:[];
 }));
}
export function accountClosing(workspace:Workspace,date:string,branchId=''){
 const chart=allAccounts(workspace),groups=new Map<string,{branchId:string;account:string;partyId?:string;cashId?:string;amount:number}>();
 for(const entry of workspace.entries.filter(entry=>entry.date<=date&&(!branchId||entry.branchId===branchId)))for(const journalLine of entry.lines){const partyId=(['130','140','210','220'].includes(journalLine.account)||(journalLine.partyId&&extras(workspace).records.contacts?.some(c=>c.id===journalLine.partyId)))?journalLine.partyId:undefined;const cashId=journalLine.cashId||(journalLine.account==='101'?defaultCashId(entry.branchId):undefined);const key=JSON.stringify([entry.branchId,journalLine.account,partyId||'',cashId||'']);const v=groups.get(key)||{branchId:entry.branchId,account:journalLine.account,partyId,cashId,amount:0};v.amount+=journalLine.debit-journalLine.credit;groups.set(key,v);}
 return [...groups.values()].map(v=>({...v,amount:money(v.amount),name:(v.partyId?workspace.parties.find(party=>party.id===v.partyId)?.name||workspace.employees.find(employee=>employee.id===v.partyId)?.name||extras(workspace).records.contacts?.find(p=>p.id===v.partyId)?.name:undefined)||(v.cashId?cashOptions(workspace,v.branchId).find(c=>c.id===v.cashId)?.name:undefined)||chart[v.account]?.name||v.account,type:chart[v.account]?.type||''})).filter(v=>v.amount!==0);
}
export function closingChecks(workspace:Workspace):string[]{
 const errors:string[]=[],end=workspace.organization.year+'-12-31',chart=allAccounts(workspace);
 if(workspace.invoices.some(invoice=>invoice.status==='draft')||workspace.stockDocuments?.some(d=>d.status==='draft'))errors.push('توجد مسودات فواتير أو مستندات مخزون؛ أكملها أو احذفها قبل الترحيل.');
 if(workspace.entries.some(entry=>money(entry.lines.reduce((n,journalLine)=>n+journalLine.debit-journalLine.credit,0))!==0))errors.push('يوجد قيد غير متزن.');
 if(workspace.entries.some(entry=>!workspace.branches.some(branch=>branch.id===entry.branchId)||entry.lines.some(journalLine=>!chart[journalLine.account])))errors.push('يوجد قيد بفرع أو حساب غير معرف.');
 if(workspace.entries.some(entry=>entry.date>end))errors.push('توجد قيود بعد تاريخ نهاية السنة.');
 for(const branch of workspace.branches){const gl=money(accountClosing(workspace,end,branch.id).filter(l=>l.account==='120').reduce((n,l)=>n+l.amount,0));const stock=money(stockClosing(workspace,end,branch.id).reduce((n,l)=>n+l.value,0));if(Math.abs(gl-stock)>.02)errors.push('قيمة مخزون '+branch.name+' لا تطابق الحساب الرقابي.');}
 for(const st of workspace.stocks){const row=stockClosing(workspace,end).find(r=>r.productId===st.productId&&r.warehouseId===st.warehouseId);if(Math.abs((row?.qty||0)-st.qty)>.00001||Math.abs((row?.value||0)-st.value)>.02)errors.push('سجل المخزون لا يطابق حركاته؛ راجع الأرصدة.');}
 if(stockClosing(workspace,end).some(r=>r.qty<0||r.value<0))errors.push('توجد أرصدة مخزون سالبة.');
 return [...new Set(errors)];
}
function emptyTarget(workspace:Workspace,year:number):BookState {
 const t=snapshot(workspace);t.organization.year=year;t.documentCounters=systemSettings(workspace).documents.resetYear?{}:carryCounters(workspace);t.entries=[];t.movements=[];t.stocks=[];t.invoices=[];t.invoiceReturns=[];t.vouchers=[];t.stockDocuments=[];t.expenses=[];t.expenseDocuments=[];t.audit=[];t.processed=[];t.dataVersion=0;t.extras={...structuredClone(extras(workspace)),operations:[],drafts:{}};return t;
}
export function applyAnnualCommand(workspace:Workspace,type:string,raw:unknown):boolean{
 if(!['periodCreate','periodTransfer','periodActivate','periodSwitch','periodReset'].includes(type))return false;
 workspace.annualBooks=structuredClone(bookCatalog(workspace));const catalog=workspace.annualBooks;
 const audit=(action:string,reference:string)=>workspace.audit.unshift({id:newId(),date:new Date().toISOString(),action,reference});
 if(type==='periodSwitch'){
  const p=z.object({id:z.string().min(1)}).parse(raw),target=catalog.books.find(b=>b.id===p.id);
  requireValue(target&&target.status!=='preparing'&&target.state,'الفترة غير متاحة أو أنها مفتوحة الآن');
  const active=catalog.books.find(b=>b.id===catalog.activeId)!;active.state=snapshot(workspace);const targetState=target!.state!;delete target!.state;catalog.activeId=target!.id;
  replaceState(workspace,targetState);workspace.annualBooks=catalog;audit('فتح فترة مالية',target!.name);return true;
 }
 requireValue(!isArchived(workspace),'الفترة السابقة مؤرشفة للعرض فقط');
 if(type==='periodCreate'){
  const p=z.object({name:z.string().trim().min(1).max(100),year:z.number().int().min(2000).max(2200)}).parse(raw);
  requireValue(p.year===workspace.organization.year+1,'الفترة الجديدة هي السنة التالية مباشرة');
  requireValue(!catalog.books.some(b=>b.year===p.year),'توجد فترة لهذه السنة بالفعل');
  catalog.books.push({id:newId(),name:p.name,year:p.year,status:'preparing',sourceId:catalog.activeId,state:emptyTarget(workspace,p.year)});audit('إنشاء مساحة سنة جديدة داخل قاعدة الاستضافة',p.name);return true;
 }
 const p=z.object({id:z.string().min(1),kind:z.enum(['stock','accounts']).optional(),date:z.string().optional(),confirmed:z.boolean().optional()}).parse(raw);
 const target=catalog.books.find(b=>b.id===p.id);requireValue(target&&target.status==='preparing'&&target.sourceId===catalog.activeId,'اختر فترة جديدة مرتبطة بالسنة المفتوحة');
 if(type==='periodReset'){target!.state=emptyTarget(workspace,target!.year);delete target!.sourceVersion;target!.stockDone=false;target!.accountsDone=false;audit('إعادة تجهيز الأرصدة المرحلة',target!.name);return true;}
 const errors=closingChecks(workspace);requireValue(!errors.length,errors.join(' '));
 const isStale=target!.sourceVersion!==undefined&&target!.sourceVersion!==(workspace.dataVersion||0);
 requireValue(!isStale,'تغيرت بيانات السنة بعد الترحيل؛ أعد تهيئة الترحيل من الإعدادات ثم احفظ الأرصدة مجددًا');
 if(type==='periodTransfer'){
  requireValue(p.kind&&p.confirmed&&p.date===workspace.organization.year+'-12-31','الترحيل لكل الفروع والمخازن في نهاية السنة؛ راجع التأكيد والتاريخ');
  requireValue(p.kind==='stock'?!target!.stockDone:!target!.accountsDone,'تم ترحيل هذه الأرصدة بالفعل');
  // Refresh master data before the first transfer; subsequent transfer requires identical source version.
  if(target!.sourceVersion===undefined)target!.state=emptyTarget(workspace,target!.year);
  target!.sourceVersion=workspace.dataVersion||0;const t=target!.state!,date=target!.year+'-01-01';
  if(p.kind==='stock'){
   const closing=stockClosing(workspace,p.date!);t.stocks=closing.map(r=>({productId:r.productId,warehouseId:r.warehouseId,qty:r.qty,value:r.value}));
   t.movements=closing.map(r=>({id:newId(),reference:'FWD-STOCK-'+workspace.organization.year,date,productId:r.productId,warehouseId:r.warehouseId,qty:r.qty,value:r.value,kind:'افتتاح'}));target!.stockDone=true;
  }else{
   const chart=allAccounts(workspace);const rows=accountClosing(workspace,p.date!);
   t.entries=workspace.branches.flatMap(branch=>{
    const ls:JournalLine[]=rows.filter(r=>r.branchId===branch.id&&!['expense','revenue'].includes(chart[r.account].type)).map(r=>({account:r.account,partyId:r.partyId,cashId:r.cashId,debit:Math.max(r.amount,0),credit:Math.max(-r.amount,0)}));
    const profit=money(ls.reduce((n,journalLine)=>n+journalLine.debit-journalLine.credit,0));if(profit)ls.push({account:'310',debit:Math.max(-profit,0),credit:Math.max(profit,0)});
    return ls.length?[{id:newId(),reference:'FWD-ACC-'+workspace.organization.year+'-'+branch.id,date,branchId:branch.id,description:'أرصدة افتتاحية مرحلة؛ نتيجة السنة ضمن النتائج المتراكمة',lines:ls}]:[];
   });
   // Preserve dependent schedules and their historical amounts, never repost their old journals.
   t.extras!.operations=structuredClone(extras(workspace).operations.filter(o=>!['count','adjustment'].includes(o.kind)));
   t.expenses=structuredClone(workspace.expenses);t.expenseDocuments=structuredClone(workspace.expenseDocuments||[]).map(d=>({...d,carriedFrom:workspace.organization.year}));target!.accountsDone=true;
  }
  audit('ترحيل '+(p.kind==='stock'?'المخزون':'الحسابات'),target!.name);return true;
 }
 requireValue(p.confirmed&&target!.stockDone&&target!.accountsDone,'رحّل المخزون والحسابات أولًا ثم أكد تفعيل الفترة');
 requireValue(!closingChecks(target!.state!).length,'تعذر مطابقة أرصدة الفترة الجديدة');
 const old=catalog.books.find(b=>b.id===catalog.activeId)!;old.status='closed';old.state=snapshot(workspace);target!.status='current';catalog.activeId=target!.id;
 const next=target!.state!;delete target!.state;replaceState(workspace,next);workspace.annualBooks=catalog;audit('تفعيل السنة الجديدة وأرشفة السابقة',target!.name);return true;
}
