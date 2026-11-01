import {Workspace} from './types';
import {systemSettings,branchDefaults} from './system-settings';
export type DocumentKind='sale'|'purchase'|'receipt'|'payment'|'opening'|'transfer'|'adjustment';
export const PREFIXES:Record<DocumentKind,string>={sale:'SAL-',purchase:'PUR-',receipt:'RCV-',payment:'PAY-',opening:'OPEN-D',transfer:'TRF-D',adjustment:'ADJ-D'};
const references=(workspace:Workspace)=>[...workspace.invoices.map(invoice=>invoice.number),...workspace.entries.map(entry=>entry.reference),...(workspace.stockDocuments||[]).map(d=>d.reference),...workspace.audit.map(a=>a.reference)];
export function nextDocumentNumber(workspace:Workspace,kind:DocumentKind,branchId:string,isAllocate=false):string{
 const p=systemSettings(workspace).documents,key=kind+(p.independentBranch?':'+branchId:''),base=PREFIXES[kind],prefix=base+(p.showBranch?branchDefaults(workspace,branchId).code+'-':'')+(p.showYear?workspace.organization.year+'-':'');
 const all=references(workspace),used=new Set(all);let legacy=Math.max(0,...all.filter(ref=>ref.startsWith(base)).map(ref=>{const rest=ref.slice(base.length);return /^\d+$/.test(rest)?Number(rest):0;}));
 if((kind==='receipt'||kind==='payment')&&!(key in (workspace.documentCounters||{})))legacy=Math.max(legacy,workspace.entries.length);
 let next=Math.max(workspace.documentCounters?.[key]||0,legacy)+1;let value=prefix+String(next).padStart(4,'0');while(used.has(value)){next++;value=prefix+String(next).padStart(4,'0');}
 if(isAllocate){workspace.documentCounters={...workspace.documentCounters,[key]:next};}return value;
}
export function carryCounters(workspace:Workspace):Record<string,number>{const result={...workspace.documentCounters};for(const k of Object.keys(PREFIXES) as DocumentKind[]){const all=[...workspace.invoices.map(invoice=>invoice.number),...workspace.entries.map(entry=>entry.reference),...(workspace.stockDocuments||[]).map(d=>d.reference)];const n=Math.max(0,...all.filter(r=>r.startsWith(PREFIXES[k])).map(r=>{const tail=r.slice(PREFIXES[k].length);return /^\d+$/.test(tail)?Number(tail):0;}));result[k]=Math.max(result[k]||0,n);}return result;}
