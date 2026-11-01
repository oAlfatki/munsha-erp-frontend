import {newId} from './id';
import {defaultCashId,requireCash} from './cash';
import {z} from 'zod';
import {Workspace,JournalLine,money} from './types';
import {extras,allAccounts} from './extensions';
export type ExpenseTreatment='current'|'accrued'|'prepaid';
export interface ExpenseDocument {currency?:string;rate?:number;foreignAmount?:number;cashId?:string;carriedFrom?:number;id:string;reference:string;date:string;branchId:string;typeId:string;account:string;treatment:ExpenseTreatment;description:string;amount:number;start:string;end:string;payments:{reference:string;date:string;amount:number;foreignAmount?:number;currency?:string;rate?:number;cashId?:string;cashAccount?:string}[];settlements:{reference:string;date:string;period:string;amount:number}[];recognitionRefs:string[];}
export const TREATMENT_LABELS={current:'مصروف حالي',accrued:'مصروف مستحق',prepaid:'مصروف مدفوع مقدمًا'};
export interface ExpenseView extends ExpenseDocument {legacy?:'cash'|'accruedExpense'|'prepaidExpense';paid:number;consumed:number;due:number;remaining:number;}
export function expenseViews(workspace:Workspace):ExpenseView[]{
 const x=extras(workspace);const docs:ExpenseDocument[]=[...(workspace.expenseDocuments||[])];
 const result=docs.map(d=>({...d,paid:money(d.payments.reduce((n,p)=>n+p.amount,0)),consumed:money(d.settlements.reduce((n,p)=>n+p.amount,0))}));
 const legacy:typeof result=[];
 for(const expense of workspace.expenses)legacy.push({id:expense.id,reference:'EXP-'+String(workspace.expenses.indexOf(expense)+1).padStart(4,'0'),date:expense.date,branchId:expense.branchId,typeId:expense.category,account:'510',treatment:'current',description:expense.description,amount:money(expense.amount*expense.rate),start:expense.date,end:expense.date,payments:[],settlements:[],recognitionRefs:[],paid:money(expense.amount*expense.rate),consumed:0,legacy:'cash'} as typeof result[number]);
 for(const o of x.operations.filter(o=>['accruedExpense','prepaidExpense'].includes(o.kind))){const isPrepaid=o.kind==='prepaidExpense',pay=x.operations.filter(v=>v.kind==='settleExpense'&&v.source===o.id),consume=x.operations.filter(v=>v.kind==='consumePrepaid'&&v.source===o.id);legacy.push({id:o.id,reference:o.reference,date:o.date,branchId:o.branchId,typeId:'legacy',account:'510',treatment:isPrepaid?'prepaid':'accrued',description:o.note||o.subject,amount:o.amount,start:o.date,end:o.date,payments:pay.map(p=>({reference:p.reference,date:p.date,amount:p.amount})),settlements:consume.map(p=>({reference:p.reference,date:p.date,period:p.period!,amount:p.amount})),recognitionRefs:[],paid:isPrepaid||o.paid?o.amount:0,consumed:money(consume.reduce((n,v)=>n+v.amount,0)),legacy:o.kind} as typeof result[number]);}
 return [...result,...legacy].map(d=>({...d,due:money(d.amount-d.paid),remaining:d.treatment==='prepaid'?money(d.paid-d.consumed):0}));
}
export const expenseForeignPaid=(d:ExpenseView)=>money(d.legacy?d.paid/(d.rate||1):d.payments.reduce((n,p)=>n+(p.foreignAmount??p.amount/(d.rate||1)),0));
export const expenseForeignDue=(d:ExpenseView)=>money((d.foreignAmount??d.amount)-expenseForeignPaid(d));
const dateSchema=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v=>!isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v),textSchema=z.string().trim().min(1).max(300),positiveSchema=z.number().finite().positive();
const check=(v:unknown,msg:string)=>{if(!v)throw new Error(msg);};
export function applyExpense(workspace:Workspace,type:string,raw:unknown):boolean {
 if(!['expenseSave','expensePayment','expenseConsume'].includes(type))return false;
 const list=workspace.expenseDocuments||=[];const audit=(action:string,reference:string)=>workspace.audit.unshift({id:newId(),date:new Date().toISOString(),action,reference});
 const validate=(d:string,b:string)=>check(+d.slice(0,4)===workspace.organization.year&&workspace.branches.some(branch=>branch.id===b&&branch.active),'راجع السنة المالية والفرع');
 const post=(reference:string,date:string,branchId:string,description:string,lines:JournalLine[])=>{check(money(lines.reduce((n,journalLine)=>n+journalLine.debit-journalLine.credit,0))===0,'قيد المصروف غير متزن');workspace.entries.push({id:newId(),reference,date,branchId,description,lines});};
 const pair=(dr:string,cr:string,amount:number):JournalLine[]=>[{account:dr,debit:amount,credit:0},{account:cr,debit:0,credit:amount}];
 const pay=(d:ExpenseDocument,amount:number,paidDate:string,cashId?:string,currency?:string,rate?:number)=>{
  validate(paidDate,d.branchId);const code=d.currency||workspace.organization.currency,fixedRate=d.rate||1;
  check(!currency||currency===code,'السداد بعملة المصروف نفسها');check(rate===undefined||rate===fixedRate,'السداد يستخدم سعر المصروف المثبت؛ فروق الصرف غير مفعلة');
  const foreign=currency?money(amount):money(amount/fixedRate),due=money(d.amount-d.payments.reduce((n,p)=>n+p.amount,0));
  const foreignDue=money((d.foreignAmount??d.amount)-d.payments.reduce((n,p)=>n+(p.foreignAmount??p.amount/fixedRate),0));
  const base=foreign===foreignDue?due:money(foreign*fixedRate);check(!(foreign<foreignDue&&base>=due),'التقريب يستنفد الرصيد المحلي؛ اختر سداد المتبقي كاملًا');check(foreign>0&&foreign<=foreignDue&&base>0&&base<=due&&paidDate>=d.date,'سداد غير صحيح أو يتجاوز المستحق');
  const cash=requireCash(workspace,d.branchId,cashId||d.cashId||defaultCashId(d.branchId),code),reference='PAY-EXP-'+newId().slice(0,8);
  const lines=pair(d.treatment==='prepaid'?'160':'230',cash.account,base);lines[1].cashId=cash.id;
  post(reference,paidDate,d.branchId,'سداد مصروف '+d.reference+' من '+cash.name+': '+d.description,lines);
  d.payments.push({reference,date:paidDate,amount:base,foreignAmount:foreign,currency:code,rate:fixedRate,cashId:cash.id,cashAccount:cash.account});return reference;
 };
 if(type==='expenseSave'){
  const p=z.object({id:z.string().optional(),date: dateSchema,branchId:textSchema,typeId:textSchema,treatment:z.enum(['current','accrued','prepaid']),description:textSchema,amount:positiveSchema,start:dateSchema,end:dateSchema,paid:z.number().finite().nonnegative().default(0),currency:z.string().optional(),rate:positiveSchema.optional(),cashId:z.string().optional()}).parse(raw);if(!(p.id&&expenseViews(workspace).some(d=>d.id===p.id&&d.date===p.date)))validate(p.date,p.branchId);
  const old=list.find(d=>d.id===p.id);if(p.id&&!old){const legacy=expenseViews(workspace).find(d=>d.id===p.id);check(legacy,'المصروف غير موجود');check(p.amount===legacy!.amount&&p.treatment===legacy!.treatment&&p.branchId===legacy!.branchId&&p.date===legacy!.date,'السجل السابق يسمح بتعديل الوصف فقط');if(legacy!.legacy==='cash')workspace.expenses.find(expense=>expense.id===p.id)!.description=p.description;else {workspace.extras=structuredClone(extras(workspace));workspace.extras.operations.find(o=>o.id===p.id)!.note=p.description;}audit('تعديل وصف مصروف سابق',legacy!.reference);return true;}
  const currency=p.currency||old?.currency||workspace.organization.currency,rate=p.rate??old?.rate??1;
  check(workspace.currencies.some(c=>c.code===currency)&&rate>0&&(currency!==workspace.organization.currency||rate===1),'راجع العملة وسعر صرفها');
  const foreignAmount=money(p.amount),baseAmount=money(foreignAmount*rate),cashId=p.cashId||old?.cashId||defaultCashId(p.branchId);
  const expenseType=extras(workspace).records.expenseTypes?.find(t=>t.id===p.typeId&&t.active),account=String(expenseType?.account||'');const chart=allAccounts(workspace),custom=extras(workspace).records.accounts?.find(a=>a.code===account);
  check(expenseType&&chart[account]?.type==='expense'&&(!custom||custom.active&&custom.postable==='yes'),'اختر نوع مصروف مرتبطًا بحساب مصروف نشط قابل للقيد');
  check(baseAmount>0&&Number.isFinite(baseAmount),'القيمة المحلية غير صحيحة');
  check(money(p.amount)>0,'أدخل مبلغًا لا يقل عن جزء من العملة');check(p.paid<=p.amount,'المبلغ المدفوع يتجاوز قيمة المصروف');check(p.start<=p.end,'بداية التغطية بعد نهايتها');
  const dependent=old&&(old.payments.length||old.settlements.length);const isFinancialChanged=old&&['date','typeId','treatment','start','end'].some(k=>(old as unknown as Record<string,unknown>)[k]!==p[k as keyof typeof p])||old&&(old.amount!==baseAmount||(old.currency||workspace.organization.currency)!==currency||(old.rate||1)!==rate||(old.foreignAmount??old.amount)!==foreignAmount||(old.cashId||defaultCashId(old.branchId))!==cashId);
  check(!old?.carriedFrom||!isFinancialChanged,'المصروف المرحل يسمح بتعديل الوصف والسداد والتسوية فقط');
  check(!old||old.branchId===p.branchId,'لا تنقل مصروفًا محفوظًا بين الفروع');check(!dependent||!isFinancialChanged,'بعد السداد أو التسوية يمكن تعديل الوصف فقط');
  if(old&&!isFinancialChanged){old.description=p.description;audit('تعديل وصف المصروف',old.reference);return true;}
  requireCash(workspace,p.branchId,cashId,currency);
  if(old){for(const ref of old.recognitionRefs){const e=workspace.entries.find(entry=>entry.reference===ref);if(e)post('EXP-CORR-'+newId().slice(0,8),e.date,e.branchId,'عكس لتصحيح '+old.reference,e.lines.map(journalLine=>({...journalLine,debit:journalLine.credit,credit:journalLine.debit})));}}
  const d:ExpenseDocument={...p,id:old?.id||newId(),reference:old?.reference||'EXPV-'+String(list.length+1).padStart(5,'0'),account,currency,rate,foreignAmount,cashId,amount:baseAmount,payments:[],settlements:[],recognitionRefs:[]};
  if(d.treatment!=='prepaid'){const ref=d.reference+'-R-'+newId().slice(0,6);post(ref,d.date,d.branchId,d.description,pair(account,'230',money(d.amount)));d.recognitionRefs.push(ref);}
  if(old)list[list.indexOf(old)]=d;else list.push(d);if(p.paid>0)pay(d,money(p.paid),p.date,cashId,currency,rate);audit(old?'تصحيح مصروف بقيد عكسي موثق':'حفظ مصروف',d.reference);return true;
 }
 const p=z.object({id:textSchema,date: dateSchema,amount:positiveSchema,period:z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).optional(),cashId:z.string().optional(),currency:z.string().optional(),rate:positiveSchema.optional()}).parse(raw);const d=list.find(d=>d.id===p.id);
 if(!d){const v=expenseViews(workspace).find(v=>v.id===p.id);check(v,'المصروف غير موجود');validate(p.date,v!.branchId);check(p.date>=v!.date,'التاريخ قبل المصروف');workspace.extras=structuredClone(extras(workspace));const op=workspace.extras.operations.find(o=>o.id===p.id);
  if(type==='expensePayment'){check(v!.legacy==='accruedExpense'&&v!.due>0&&p.amount===v!.due,'سداد السجل السابق كامل فقط');const ref='PAY-EXP-'+newId().slice(0,8);const cash=requireCash(workspace,v!.branchId,p.cashId||defaultCashId(v!.branchId),workspace.organization.currency);check(!p.currency||p.currency===workspace.organization.currency,'السجل السابق يسدد بالعملة الأساسية');const ls=pair('230',cash.account,money(p.amount));ls[1].cashId=cash.id;post(ref,p.date,v!.branchId,'سداد مصروف سابق '+v!.reference+' من '+cash.name,ls);op!.paid=true;workspace.extras.operations.push({id:newId(),kind:'settleExpense',reference:ref,date:p.date,branchId:v!.branchId,subject:op!.subject,amount:money(p.amount),source:op!.id,note:'سند صرف مصروف سابق'});audit('سند صرف مرتبط بالمصروف',ref);return true;}
  check(v!.legacy==='prepaidExpense'&&p.period&&p.period<=p.date.slice(0,7)&&p.period>=v!.date.slice(0,7)&&!v!.settlements.some(a=>a.period===p.period)&&p.amount<=v!.remaining,'راجع الفترة والمتبقي');const ref='EXP-AMORT-'+newId().slice(0,8);post(ref,p.date,v!.branchId,'تسوية مقدم سابق '+v!.reference,pair('510','160',money(p.amount)));workspace.extras.operations.push({id:newId(),kind:'consumePrepaid',reference:ref,date:p.date,period:p.period,branchId:v!.branchId,subject:op!.subject,amount:money(p.amount),source:op!.id,note:'تسوية مقدم سابق'});audit('تسوية مصروف مقدم',ref);return true;
 }
 if(type==='expensePayment'){const ref=pay(d,money(p.amount),p.date,p.cashId,p.currency,p.rate);audit('سند صرف مرتبط بالمصروف',ref);return true;}
 validate(p.date,d.branchId);const remaining=money(d.payments.reduce((n,p)=>n+p.amount,0)-d.settlements.reduce((n,p)=>n+p.amount,0));check(d.treatment==='prepaid'&&p.period&&p.period>=d.start.slice(0,7)&&p.period<=d.end.slice(0,7)&&p.period<=p.date.slice(0,7)&&p.date>=d.date&&!d.settlements.some(a=>a.period===p.period)&&money(p.amount)<=remaining,'الفترة مكررة أو خارج التغطية أو المبلغ يتجاوز المقدم المدفوع المتبقي');const reference='EXP-AMORT-'+newId().slice(0,8);post(reference,p.date,d.branchId,'تسوية مقدم '+d.reference+': '+d.description,pair(d.account,'160',money(p.amount)));d.settlements.push({reference,date:p.date,period:p.period!,amount:money(p.amount)});audit('تسوية دورية لمصروف مقدم',reference);return true;
}
