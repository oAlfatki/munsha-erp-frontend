import {allocateInvoiceDiscount} from './invoice-discounts';
import { InvoiceLine, lineTotal, money, Workspace } from './types';
export function invoiceSummary(lines: InvoiceLine[], payment: 'cash'|'credit'|'mixed',paidAmount=0,taxRate=0,invoiceDiscount?:number) {
    const base=money(lines.reduce((n,invoiceLine)=>n+money(invoiceLine.qty*invoiceLine.price*(1-invoiceLine.discount/100)),0));
    if(invoiceDiscount!==undefined&&base>=0&&Number.isFinite(base)&&lines.every(invoiceLine=>invoiceLine.qty>=0&&invoiceLine.price>=0&&invoiceLine.discount>=0&&invoiceLine.discount<=100))lines=allocateInvoiceDiscount(lines,Math.min(base,Math.max(0,invoiceDiscount)));
    const gross=money(lines.reduce((n,invoiceLine)=>n+money(invoiceLine.qty*invoiceLine.price),0));
    const subtotal=money(lines.reduce((n,invoiceLine)=>n+lineTotal(invoiceLine),0)),tax=money(subtotal*taxRate/100),net=money(subtotal+tax);
    return { gross, lineDiscount:money(gross-base),invoiceDiscount:money(lines.reduce((n,invoiceLine)=>n+(invoiceLine.invoiceDiscount||0),0)),subtotal,tax,taxRate,discount:money(gross-subtotal), net, paid:payment==='cash'?net:payment==='mixed'?money(paidAmount):0, remaining:payment==='cash'?0:money(net-(payment==='mixed'?paidAmount:0)), items:new Set(lines.map(invoiceLine=>invoiceLine.productId)).size, rows:lines.length };
}
export function statementData(workspace:Workspace,branchId:string,partyId:string,from:string,to:string,query='') {
    const p=workspace.parties.find(party=>party.id===partyId), control=p?.kind==='customer'?'130':'210';
    const selected=(entry:Workspace['entries'][number])=>entry.lines.filter(journalLine=>journalLine.partyId===partyId&&journalLine.account===control);
    const opening=money(workspace.entries.filter(entry=>entry.branchId===branchId&&from&&entry.date<from).flatMap(selected).reduce((n,journalLine)=>n+journalLine.debit-journalLine.credit,0));
    let running=opening;
    const full=workspace.entries.filter(entry=>entry.branchId===branchId&&(!from||entry.date>=from)&&(!to||entry.date<=to)&&selected(entry).length).slice().sort((leftEntry,rightEntry)=>leftEntry.date.localeCompare(rightEntry.date)).map(e=>{const ls=selected(e),debit=money(ls.reduce((n,journalLine)=>n+journalLine.debit,0)),credit=money(ls.reduce((n,journalLine)=>n+journalLine.credit,0));running=money(running+debit-credit);return {entry:e,debit,credit,running};});
    return {opening,closing:running,debit:money(full.reduce((n,r)=>n+r.debit,0)),credit:money(full.reduce((n,r)=>n+r.credit,0)),rows:full.filter(r=>(r.entry.reference+' '+r.entry.description).includes(query)),count:full.length};
}
const ONES=['','واحد','اثنان','ثلاثة','أربعة','خمسة','ستة','سبعة','ثمانية','تسعة'];
const TEENS=['عشرة','أحد عشر','اثنا عشر','ثلاثة عشر','أربعة عشر','خمسة عشر','ستة عشر','سبعة عشر','ثمانية عشر','تسعة عشر'];
const TENS=['','','عشرون','ثلاثون','أربعون','خمسون','ستون','سبعون','ثمانون','تسعون'];
function below100(n:number):string { if(n<10)return ONES[n];if(n<20)return TEENS[n-10];return [ONES[n%10],TENS[Math.floor(n/10)]].filter(Boolean).join(' و'); }
function below1000(n:number):string {const h=Math.floor(n/100),rest=n%100;const hundreds=['','مئة','مئتان','ثلاثمئة','أربعمئة','خمسمئة','ستمئة','سبعمئة','ثمانمئة','تسعمئة'];return[hundreds[h],below100(rest)].filter(Boolean).join(' و');}
export function arabicNumber(n:number):string {if(!Number.isSafeInteger(n)||n<0||n>=1e12)throw Error('القيمة خارج نطاق التفقيط');if(n===0)return 'صفر';const scales=[['','',''],['ألف','ألفان','آلاف'],['مليون','مليونان','ملايين'],['مليار','ملياران','مليارات']];const parts:string[]=[];let i=0;while(n){const g=n%1000;if(g){const scale=scales[i];parts.unshift(i===0?below1000(g):g===1?scale[0]:g===2?scale[1]:below1000(g)+' '+(g>=3&&g<=10?scale[2]:scale[0]));}n=Math.floor(n/1000);i++;}return parts.join(' و');}
type CurrencyWords={singular:string;dual:string;plural:string;fraction:string;fractionDual:string;fractionPlural:string};
const CURRENCIES:Record<string,CurrencyWords>={YER:{singular:'ريال يمني',dual:'ريالان يمنيان',plural:'ريالات يمنية',fraction:'فلس',fractionDual:'فلسان',fractionPlural:'فلوس'},SAR:{singular:'ريال سعودي',dual:'ريالان سعوديان',plural:'ريالات سعودية',fraction:'هللة',fractionDual:'هللتان',fractionPlural:'هللات'},USD:{singular:'دولار أمريكي',dual:'دولاران أمريكيان',plural:'دولارات أمريكية',fraction:'سنت',fractionDual:'سنتان',fractionPlural:'سنتات'}};
function counted(n:number,singular:string,dual:string,plural:string){if(n===1)return singular+' واحد';if(n===2)return dual;return arabicNumber(n)+' '+(n%100>=3&&n%100<=10?plural:singular);}
export function amountInWords(amount:number,currency='YER'):string {
    if(!Number.isFinite(amount)||Math.abs(amount)>=1e10)return 'المبلغ خارج نطاق التفقيط';
    const cents=Math.round(Math.abs(money(amount))*100),whole=Math.floor(cents/100),fraction=cents%100,c=CURRENCIES[currency];
    if(!c)return `فقط ${amount<0?'سالب ':''}${arabicNumber(whole)} وحدة من ${currency}${fraction?' و'+arabicNumber(fraction)+' جزءًا من مئة':''} لا غير`;
    let main=counted(whole,c.singular,c.dual,c.plural);
    if(whole%100>=11&&whole%100<=99)main=main.replace(c.singular,({YER:'ريالًا يمنيًا',SAR:'ريالًا سعوديًا',USD:'دولارًا أمريكيًا'} as Record<string,string>)[currency]);
    let minor=fraction?counted(fraction,c.fraction,c.fractionDual,c.fractionPlural):'';
    if(currency==='SAR'&&fraction){
        const fem=['','واحدة','اثنتان','ثلاث','أربع','خمس','ست','سبع','ثمان','تسع'];
        const word=fraction<10?fem[fraction]:fraction===10?'عشر':fraction===11?'إحدى عشرة':fraction===12?'اثنتا عشرة':fraction<20?fem[fraction-10]+' عشرة':[(fraction%10===1?'إحدى':fraction%10===2?'اثنتان':fem[fraction%10]),TENS[Math.floor(fraction/10)]].filter(Boolean).join(' و');
        minor=fraction===1?'هللة واحدة':fraction===2?'هللتان':word+' '+(fraction>=3&&fraction<=10?'هللات':'هللة');
    }
    return 'فقط '+(amount<0&&cents?'سالب ':'')+[main,minor].filter(Boolean).join(' و')+' لا غير';
}
