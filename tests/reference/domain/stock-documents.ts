import {nextDocumentNumber} from './numbering';
import {newId} from './id';
import { z } from 'zod';
import { Workspace, JournalLine, money } from './types';
import { allAccounts } from './extensions';
export interface StockDocumentLine { productId:string;unit:number;qty:number;price:number;expectedQty?:number;value?:number; }
export interface OpeningAccountLine { account:string;partyId:string;debit:number;credit:number;description:string; }
export interface StockDocument { openingScope?:'accounts'|'stock';openingOffsetAccount?:string; id:string;reference:string;kind:'opening'|'transfer'|'adjustment';status:'draft'|'final';date:string;branchId:string;warehouseId:string;toWarehouseId:string;currency:string;rate:number;direction:'shortage'|'excess';note:string;lines:StockDocumentLine[];accounts:OpeningAccountLine[];total:number;createdAt:string; }
const strSchema=z.string().trim().min(1).max(180),numSchema=z.number().finite().nonnegative(),positiveSchema=z.number().finite().positive();
const dateSchema=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(d=>!isNaN(Date.parse(d))&&new Date(d).toISOString().slice(0,10)===d);
const stockDocumentSchema=z.object({openingScope:z.enum(['accounts','stock']).optional(),openingOffsetAccount:z.string().optional(),id:z.string().optional(),kind:z.enum(['opening','transfer','adjustment']),status:z.enum(['draft','final']),date: dateSchema,branchId:strSchema,warehouseId:z.string(),toWarehouseId:z.string().default(''),currency:strSchema,rate:positiveSchema,direction:z.enum(['shortage','excess']).default('shortage'),note:z.string().max(1000),lines:z.array(z.object({productId:strSchema,unit:z.number().int().nonnegative(),qty:positiveSchema,price:numSchema,expectedQty:numSchema.optional()})).max(100),accounts:z.array(z.object({account:strSchema,partyId:z.string().default(''),debit:numSchema,credit:numSchema,description:z.string().max(300)})).max(100)});
export function applyStockDocument(workspace:Workspace,type:string,raw:unknown):boolean {
 if(type!=='stockDocument'&&type!=='deleteStockDraft')return false;
 workspace.stockDocuments||=[];const docs=workspace.stockDocuments;
 const fail=(message:string):never=>{throw Error(message);};
 if(type==='deleteStockDraft'){const p=z.object({id:strSchema}).parse(raw),old=docs.find(v=>v.id===p.id);if(!old||old.status!=='draft')fail('يمكن حذف المسودة فقط');workspace.stockDocuments=docs.filter(v=>v.id!==p.id);return true;}
 const p=stockDocumentSchema.parse(raw),old=docs.find(v=>v.id===p.id);
 if(p.kind==='opening'){
  if(p.lines.length&&p.accounts.length)fail('أصناف بداية المدة وأرصدة الحسابات مستندان مستقلان؛ لا تجمعهما');
  p.openingScope||=p.lines.length?'stock':'accounts';
  if(p.openingScope==='stock'&&p.accounts.length||p.openingScope==='accounts'&&p.lines.length)fail('بنود لا تتوافق مع نوع الافتتاح');
  if(p.openingScope==='accounts')p.warehouseId='';
 }
 if(p.kind!=='opening'&&p.accounts.length)fail('لا تضاف أرصدة حسابات إلى مستند مخزني');
 if(old?.openingScope&&old.openingScope!==p.openingScope)fail('لا يتغير نوع الافتتاح');
 if(p.id&&!old)fail('المستند غير موجود');if(old?.status==='final')fail('لا يعدل مستند نهائي');if(old&&old.kind!==p.kind)fail('لا يتغير نوع المستند');
 if(+p.date.slice(0,4)!==workspace.organization.year)fail('التاريخ خارج السنة المالية');
 if(!workspace.branches.some(branch=>branch.id===p.branchId&&branch.active))fail('فرع غير متاح');
 if(!workspace.currencies.some(c=>c.code===p.currency)||(p.currency===workspace.organization.currency&&p.rate!==1))fail('عملة أو سعر صرف غير صحيح');
 if(p.kind!=='opening'&&(p.currency!=='YER'||p.rate!==1))fail('التحويل والتسوية بالقيمة الدفترية بالعملة الأساسية');
 const warehouse=workspace.warehouses.find(warehouse=>warehouse.id===p.warehouseId&&warehouse.active&&warehouse.branchId===p.branchId);
 if(p.lines.length&&!warehouse)fail('اختر مخزنًا نشطًا تابعًا للفرع');
 const ref=old?.reference||nextDocumentNumber(workspace,p.kind,p.branchId,true);
 const doc:StockDocument={...p,id:old?.id||newId(),reference:ref,total:0,createdAt:old?.createdAt||new Date().toISOString()};
 const post=(branchId:string,suffix:string,description:string,lines:JournalLine[])=>{const dr=money(lines.reduce((n,journalLine)=>n+journalLine.debit,0)),cr=money(lines.reduce((n,journalLine)=>n+journalLine.credit,0));if(dr<=0||dr!==cr)fail('القيد غير متزن؛ لا يملأ فرق الافتتاح تلقائيًا');workspace.entries.push({id:newId(),reference:ref+suffix,date:p.date,branchId,description,lines});};
 const movement=(productId:string,warehouseId:string,qty:number,value:number,kind:string)=>{let st=workspace.stocks.find(v=>v.productId===productId&&v.warehouseId===warehouseId);if(!st){st={productId,warehouseId,qty:0,value:0};workspace.stocks.push(st);}if(st.qty+qty<-.000001||st.value+value<-.02)fail('المخزون غير كافٍ');st.qty=+(st.qty+qty).toFixed(6);st.value=money(st.value+value);if(Math.abs(st.qty)<.000001){st.qty=0;st.value=0;}workspace.movements.push({id:newId(),reference:ref,date:p.date,warehouseId,productId,qty,value,kind});};
 if(p.lines.length===0&&(p.kind!=='opening'||p.accounts.length===0))fail('أضف بندًا واحدًا على الأقل');
 if(new Set(p.lines.map(l=>l.productId)).size!==p.lines.length)fail('الصنف مكرر؛ اجمع كميته في بند واحد');
 for(const l of p.lines){const product=workspace.products.find(product=>product.id===l.productId&&product.active);if(!product||!product.units[l.unit])fail('صنف أو وحدة غير متاحة');}
 if(p.status==='final'){
  if(!workspace.organization.policyApproved)fail('سياسة التكلفة غير معتمدة للتجربة');
  if(p.kind==='opening'){
   const openingReferences=new Set(docs.filter(d=>d.kind==='opening'&&d.status==='final').map(d=>d.reference));
   if(workspace.entries.some(entry=>entry.branchId===p.branchId&&!openingReferences.has(entry.reference))||workspace.movements.some(m=>workspace.warehouses.some(warehouse=>warehouse.branchId===p.branchId&&warehouse.id===m.warehouseId)&&m.kind!=='افتتاح'))fail('الافتتاح للفرع الخالي من الحركات التشغيلية فقط');
   if(p.openingScope==='accounts'&&docs.some(d=>d.kind==='opening'&&d.status==='final'&&d.branchId===p.branchId&&(d.openingScope==='accounts'||d.accounts.length>0)))fail('أرصدة الحسابات الافتتاحية معتمدة لهذا الفرع؛ يمنع التكرار');
   if(p.openingScope==='stock'&&workspace.movements.some(m=>m.warehouseId===p.warehouseId))fail('أصناف بداية المدة معتمدة لهذا المخزن؛ يمنع التكرار');
   let inventory=0;
   for(const l of doc.lines){const product=workspace.products.find(product=>product.id===l.productId)!;const value=money(l.qty*l.price*p.rate);if(value<=0)fail('تكلفة مخزون البداية يجب أن تكون موجبة');l.value=value;inventory=money(inventory+value);movement(l.productId,p.warehouseId,l.qty*product.units[l.unit].factor,value,'افتتاح');}
   const chart=allAccounts(workspace),journal:JournalLine[]=[];
   for(const l of p.accounts){
    if(!chart[l.account]||['120','140','150','160','170','179','220','230','400','500','510','520','530','540'].includes(l.account)||['revenue','expense'].includes(chart[l.account].type))fail('حساب افتتاحي غير متاح؛ المخزون يدخل من شاشة أصناف بداية المدة فقط');
    const custom=workspace.extras?.records.accounts?.find(a=>a.code===l.account);if(custom&&(!custom.active||custom.postable!=='yes'))fail('الحساب غير قابل للقيد');
    if((l.debit>0)===(l.credit>0))fail('كل سطر مدين أو دائن فقط');
    if(['130','210'].includes(l.account)){const party=workspace.parties.find(party=>party.id===l.partyId&&party.kind===(l.account==='130'?'customer':'supplier')&&party.active);if(!party)fail('اختر الطرف المناسب لحساب الذمة');}else if(l.partyId)fail('الطرف يحدد لحساب الذمة فقط');
    journal.push({account:l.account,debit:money(l.debit*p.rate),credit:money(l.credit*p.rate),partyId:l.partyId||undefined});
   }
   if(p.openingScope==='stock'){
    const offset=p.openingOffsetAccount,custom=workspace.extras?.records.accounts?.find(a=>a.code===offset);
    if(!offset||chart[offset]?.type!=='equity'||custom&&(!custom.active||custom.postable!=='yes'))fail('اختر حساب حقوق ملكية مقابل مخزون البداية');
    journal.push({account:'120',debit:inventory,credit:0},{account:offset!,debit:0,credit:inventory});
   }
   post(p.branchId,'',p.openingScope==='stock'?'أصناف بداية المدة':'أرصدة الحسابات الافتتاحية',journal);doc.total=money(journal.reduce((n,journalLine)=>n+journalLine.debit,0));
  }else{
   if(workspace.movements.some(m=>(m.warehouseId===p.warehouseId||(p.kind==='transfer'&&m.warehouseId===p.toWarehouseId))&&m.date>p.date))fail('تاريخ المستند يسبق حركة لاحقة للمخزن؛ لا يعاد احتساب التكلفة بأثر رجعي');
   const dest=workspace.warehouses.find(warehouse=>warehouse.id===p.toWarehouseId&&warehouse.active);if(p.kind==='transfer'&&(!dest||dest.id===p.warehouseId))fail('اختر مخزن استلام مختلفًا');
   let amount=0;
   for(const l of doc.lines){const product=workspace.products.find(product=>product.id===l.productId)!,st=workspace.stocks.find(v=>v.productId===l.productId&&v.warehouseId===p.warehouseId);if(!st||st.qty<=0)throw Error('الصنف بلا رصيد أو تكلفة موثقة');const qty=l.qty*product.units[l.unit].factor;if(p.kind==='adjustment'&&(l.expectedQty===undefined||Math.abs(l.expectedQty-st.qty)>.000001))fail('تغير الرصيد بعد المراجعة؛ حدّث الكمية الدفترية قبل التسوية');const value=money(qty===st.qty?st.value:qty*st.value/st.qty);if(value<=0)fail('قيمة الحركة تساوي صفرًا');l.value=value;amount=money(amount+value);
    const isNegative=p.kind==='transfer'||p.direction==='shortage';movement(l.productId,p.warehouseId,isNegative?-qty:qty,isNegative?-value:value,p.kind==='transfer'?'تحويل صادر':'تسوية جرد');
    if(p.kind==='transfer')movement(l.productId,p.toWarehouseId,qty,value,'تحويل وارد');
   }
   doc.total=amount;
   if(p.kind==='transfer'&&dest!.branchId!==p.branchId){post(p.branchId,'-OUT','تحويل مخزون لفرع آخر',[{account:'150',debit:amount,credit:0},{account:'120',debit:0,credit:amount}]);post(dest!.branchId,'-IN','استلام مخزون من فرع آخر',[{account:'120',debit:amount,credit:0},{account:'150',debit:0,credit:amount}]);}
   if(p.kind==='adjustment')post(p.branchId,'',p.note||'تسوية مخزون',p.direction==='shortage'?[{account:'540',debit:amount,credit:0},{account:'120',debit:0,credit:amount}]:[{account:'120',debit:amount,credit:0},{account:'540',debit:0,credit:amount}]);
  }
 }
 workspace.stockDocuments=old?docs.map(v=>v.id===doc.id?doc:v):[...docs,doc];workspace.audit.unshift({id:newId(),date:new Date().toISOString(),action:p.status==='draft'?'حفظ مسودة مستند بلا أثر':'حفظ مستند مخزني / افتتاحي نهائي',reference:ref});return true;
}
