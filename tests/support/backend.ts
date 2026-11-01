import {readResponse} from './read-responses';
import type { Page } from "@playwright/test";
import { applyCommand, createSeed } from "../reference/domain/engine";

/** Test-only HTTP boundary. Production contains no seed data, demo identity, or in-browser accounting engine. */
export async function installTestBackend(page:Page,initialSignedIn=true){
 let signedIn=initialSignedIn;let state=createSeed();let revision=0;
 const receipts=new Map<string,{signature:string;revision:number}>();
 const calls:{method:string;path:string;body:unknown}[]=[];
 const user={userId:'test-user',displayName:'مستخدم اختبار',fullName:null,email:'',kind:'local',role:'admin',mustChange:false,sessionId:'test-session'};
 await page.route('**/api/v1/**',async route=>{
  const request=route.request();const path=new URL(request.url()).pathname.replace('/api/v1','');const method=request.method();
  const body=request.postDataJSON() as Record<string,unknown>|null;calls.push({method,path,body});
  const ok=(data:unknown)=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({isSuccess:true,data})});
  const problem=(status:number,detail:string)=>route.fulfill({status,contentType:'application/problem+json',body:JSON.stringify({status,title:detail,detail})});
  if(path==='/auth/login'){signedIn=true;return ok({ok:true});}
  if(!signedIn)return problem(401,'Authentication required');
  if(path==='/auth/logout'){signedIn=false;return ok({ok:true});}
  if(path==='/auth/me')return ok({user,users:[],sessions:[]});
  if(method!=='GET'&&(path.startsWith('/auth/')||path.startsWith('/users')))return ok({ok:true});
  if(path==='/workspace')return problem(410,'Workspace endpoint must not be called');
  if(method==='GET'&&!path.startsWith('/backups')){try{return ok(readResponse(state,path,Object.fromEntries(new URL(request.url()).searchParams),revision));}catch{return problem(404,'Unknown read resource: '+path);}}
  if(path==='/backups'&&method==='GET')return ok({rows:[]});
  if(path.startsWith('/backups/'))return ok({skipped:true,revision,state,createdAt:new Date().toISOString()});
  if(method==='POST'&&path.includes('/commands/')){
   if(!body)return problem(400,'Missing command');
   const id=String(body.id);const signature=JSON.stringify({type:body.type,data:body.data});const old=receipts.get(id);
   if(old)return old.signature===signature?ok({revision:old.revision}):problem(409,'Request ID reused');
   if(body.revision!==revision)return problem(409,'Workspace changed');
   try{state=applyCommand(state,String(body.type),body.data,{id:user.userId,name:user.displayName});revision++;receipts.set(id,{signature,revision});return ok({revision});}
   catch(error){return problem(422,error instanceof Error?error.message:'Invalid command');}
  }
  return problem(404,'Unimplemented test route: '+path);
 });
 return {calls,getState:()=>state,getRevision:()=>revision};
}
