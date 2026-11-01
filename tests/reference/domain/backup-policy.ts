import {z} from 'zod';
import type {Workspace} from './types';
export const backupPolicySchema=z.object({mode:z.enum(['off','interval','daily','exit']),hours:z.number().int().min(1).max(168),time:z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),folder:z.string().trim().min(1).max(80).regex(/^[\p{L}\p{N}_ -]+$/u,'اسم المجلد يحتوي حروفًا أو أرقامًا فقط'),retention:z.number().int().min(5).max(100)});
export type BackupPolicy=z.infer<typeof backupPolicySchema>;
export const DEFAULT_BACKUP_POLICY:BackupPolicy={mode:'off',hours:4,time:'20:00',folder:'نسخ المنشأة',retention:20};
export function backupPolicy(workspace:Workspace):BackupPolicy{return {...DEFAULT_BACKUP_POLICY,...workspace.backupSettings};}
/** Server-enforced slots deduplicate concurrent browser tabs. All day/time slots use Aden. */
export function backupSlot(p:BackupPolicy,now:Date,event:'timer'|'exit'){
 if(p.mode==='off'||(p.mode==='exit')!==(event==='exit'))return null;
 const ms=now.getTime(),local=new Date(ms+3*3600000),day=local.toISOString().slice(0,10);
 if(p.mode==='daily')return local.toISOString().slice(11,16)>=p.time?'daily-'+day:null;
 return (p.mode==='exit'?'exit-':'interval-')+Math.floor(ms/((p.mode==='exit'?5/60:p.hours)*3600000));
}
