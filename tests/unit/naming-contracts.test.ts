import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import baseline from '../fixtures/dto-field-preservation.json';
for (const entry of baseline)
  it('preserves original DTO wire fields after splitting ' + entry.file, () => {
    const actual: { name: string; isOptional: boolean }[] = [];
    for (const file of entry.currentFiles) {
      const sf = ts.createSourceFile(
        file,
        readFileSync(file, 'utf8'),
        ts.ScriptTarget.Latest,
        true,
      );
      function visit(node: ts.Node) {
        if (ts.isPropertySignature(node))
          actual.push({
            name: node.name.getText(sf).replace(/^['"]|['"]$/g, ''),
            isOptional: !!node.questionToken,
          });
        ts.forEachChild(node, visit);
      }
      visit(sf);
    }
    expect(actual).toEqual(entry.expected);
  });
