import {it,expect} from 'vitest';
import {readdirSync,readFileSync,statSync,existsSync} from 'node:fs';
import {join,basename} from 'node:path';
import ts from 'typescript';
const walk=(dir:string):string[]=>readdirSync(dir).flatMap(name=>{const path=join(dir,name);return statSync(path).isDirectory()?walk(path):[path];});
it('keeps server runtimes, demo execution and the old Workspace endpoint outside application code',()=>{
 for(const file of walk('src').filter(f=>/\.tsx?$/.test(f))){const code=readFileSync(file,'utf8');expect(code,file).not.toMatch(/from ['"](?:next\/|cloudflare:|@server\/|@hosting\/)|createSeed|applyCommand|ROUTE_VIEWS|executeFeatureCommand/);expect(code,file).not.toContain("'/workspace'");}
});
it('all feature folders use the approved layer names, without empty or obsolete folders',()=>{
 for(const feature of readdirSync('src/features'))for(const folder of ['store','routes','config','validations','mappers'])expect(existsSync(join('src/features',feature,folder)),feature+'/'+folder).toBe(false);
});
it('each independently declared type has a matching individual PascalCase file',()=>{
 for(const file of walk('src').filter(file=>file.includes('/types/')&&file.endsWith('.ts'))){const sf=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);const types=sf.statements.filter(node=>ts.isInterfaceDeclaration(node)||ts.isTypeAliasDeclaration(node));if(types.length){expect(types,file).toHaveLength(1);expect(basename(file,'.ts'),file).toBe((types[0] as ts.InterfaceDeclaration).name.text);}}
});
it('contains no explicit any types or debugging console calls',()=>{
 for(const file of walk('src').filter(file=>/\.tsx?$/.test(file))){const sf=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true);const violations:string[]=[];function visit(node:ts.Node){if(node.kind===ts.SyntaxKind.AnyKeyword)violations.push('explicit any');if(ts.isCallExpression(node)&&node.expression.getText(sf)==='console.log')violations.push('console.log');ts.forEachChild(node,visit);}visit(sf);expect(violations,file).toEqual([]);}
});
