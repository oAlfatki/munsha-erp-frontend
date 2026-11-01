import type {Workspace} from './types';
/** Current books use a calendar financial year; never use today's year for filters. */
export function fiscalRange(s:Pick<Workspace,'organization'>){return {from:`${s.organization.year}-01-01`,to:`${s.organization.year}-12-31`};}
