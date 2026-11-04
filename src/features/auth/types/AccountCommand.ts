import type { IChangePasswordInput } from './IChangePasswordInput';
export type AccountCommand={operation:'logout'}|{operation:'changePassword';input:IChangePasswordInput}|{operation:'revokeSession';id:string}|{operation:'revokeOtherSessions'};
