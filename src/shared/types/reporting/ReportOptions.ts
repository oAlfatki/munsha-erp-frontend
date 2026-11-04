import type { ReportDocument } from '@/core/types/ReportDocument';
export interface ReportOptions{title:string;summaryColumns?:number[];rowDocument?:(row:(string|number)[])=>ReportDocument|undefined;getAmount?:(rows:(string|number)[][])=>number;extraTotals?:(rows:(string|number)[][])=>[string,string][];}
