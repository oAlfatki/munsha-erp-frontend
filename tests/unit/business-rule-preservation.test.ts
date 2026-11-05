import { readFileSync, readdirSync } from 'node:fs';
import ts from 'typescript';
import { it, expect } from 'vitest';
import baseline from '../fixtures/business-rule-preservation.json';
import { extras } from "@/features/ledger/services/extensions";
import { extras as originalExtras } from '../reference/domain/extensions';
import { createSeed } from '../reference/domain/engine';
// Runtime AST equivalence against the frozen original reference. Type annotations are
// intentionally excluded: narrow context types replace the original global model.
function canonical(n: ts.Node): unknown {
  if (ts.isTypeNode(n)) return undefined;
  if (ts.isParenthesizedExpression(n)) return canonical(n.expression);
  const children: unknown[] = [];
  ts.forEachChild(n, (c) => {
    if (ts.isTypeNode(c)) return;
    if (ts.isVariableStatement(c)) {
      for (const d of c.declarationList.declarations)
        children.push([
          'VariableStatement',
          null,
          [
            [
              'VariableDeclarationList',
              c.declarationList.flags & (ts.NodeFlags.Const | ts.NodeFlags.Let),
              [canonical(d)],
            ],
          ],
        ]);
    } else children.push(canonical(c));
  });
  return [
    ts.SyntaxKind[n.kind],
    ts.isIdentifier(n) ||
    ts.isPrivateIdentifier(n) ||
    ts.isStringLiteralLike(n) ||
    ts.isNumericLiteral(n)
      ? n.text
      : ts.isVariableDeclarationList(n)
        ? n.flags & (ts.NodeFlags.Const | ts.NodeFlags.Let)
        : null,
    children,
  ];
}
function find(file: string, symbol: string) {
  const sf = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  return sf.statements.find((n) => ts.isFunctionDeclaration(n) && n.name?.text === symbol) as
    | ts.FunctionDeclaration
    | undefined;
}
const references = readdirSync('tests/reference/domain')
  .filter((f) => f.endsWith('.ts'))
  .map((f) => 'tests/reference/domain/' + f);
for (const entry of baseline.filter((e) => e.symbol !== 'extras'))
  it('preserves original runtime business/read function: ' + entry.symbol, () => {
    const original = references.map((f) => find(f, entry.symbol)).find(Boolean);
    const current = find(entry.file, entry.symbol);
    expect(original?.body, entry.original).toBeDefined();
    expect(current?.body, entry.file).toBeDefined();
    expect(canonical(current!.body!)).toEqual(canonical(original!.body!));
  });
it('preserves extras output for full valid inputs while permitting projections without products', () => {
  for (const fixture of [
    createSeed(),
    { ...createSeed(), extras: undefined },
    { ...createSeed(), products: [] },
  ]) {
    const before = JSON.stringify(fixture);
    expect(extras(fixture)).toEqual(originalExtras(fixture));
    expect(JSON.stringify(fixture)).toBe(before);
  }
  expect(extras({})).toEqual(originalExtras({ ...createSeed(), products: [], extras: undefined }));
});
