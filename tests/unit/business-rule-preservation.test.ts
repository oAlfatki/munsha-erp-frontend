import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import ts from "typescript";
import { it, expect } from "vitest";
import baseline from "../fixtures/business-rule-preservation.json";

// Golden hashes captured from the original ZIP, not generated from the refactored implementation.
// Compare body ASTs, ignoring formatting, comments and redundant expression/type parentheses.
function canonical(n:ts.Node):unknown{if(ts.isParenthesizedExpression(n))return canonical(n.expression);if(ts.isParenthesizedTypeNode(n))return canonical(n.type);const children:unknown[]=[];ts.forEachChild(n,c=>{if(ts.isVariableStatement(c)){for(const d of c.declarationList.declarations)children.push(['VariableStatement',null,[['VariableDeclarationList',c.declarationList.flags&(ts.NodeFlags.Const|ts.NodeFlags.Let),[canonical(d)]]]]);}else children.push(canonical(c));});return [ts.SyntaxKind[n.kind],ts.isIdentifier(n)||ts.isPrivateIdentifier(n)||ts.isStringLiteralLike(n)||ts.isNumericLiteral(n)?(ts.isIdentifier(n)&&n.text==='ErpReadModel'&&n.parent&&ts.isTypeReferenceNode(n.parent)?'Workspace':n.text):ts.isVariableDeclarationList(n)?n.flags&(ts.NodeFlags.Const|ts.NodeFlags.Let):null,children];}
for (const entry of baseline)
  it('preserves original business/read function: ' + entry.symbol, () => {
    const source = ts.createSourceFile(
      entry.file,
      readFileSync(entry.file, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
    );
    const fn = source.statements.find(
      (node) => ts.isFunctionDeclaration(node) && node.name?.text === entry.symbol,
    ) as ts.FunctionDeclaration | undefined;
    expect(fn?.body, entry.file).toBeDefined();
    const hash = createHash('sha256')
      .update(JSON.stringify(canonical(fn!.body!)))
      .digest('hex');
    expect(hash, entry.original).toBe(entry.astHash);
  });
