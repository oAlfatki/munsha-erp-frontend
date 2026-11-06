import ts from 'typescript';

/** Adapt Zod's record constructor ABI only; keep the historical oracle's files and checks intact. */

export function referenceCompatibility() {

  return {
    name: 'frozen-reference-record-compatibility',
    enforce: 'pre',

    transform(code, id) {

      const file = id.replaceAll('\\', '/').split('?')[0];
      if (!file.includes('/tests/reference/') || !file.endsWith('.ts')) return null;
      const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
      const positions = [];

      function visit(node) {

        if (
          ts.isCallExpression(node) &&
          node.expression.getText(source) === 'z.record' &&
          node.arguments.length === 1
        )
          positions.push(node.arguments[0].getStart(source));
        ts.forEachChild(node, visit);
      }

      visit(source);
      for (const position of positions.sort((left, right) => right - left))
        code = code.slice(0, position) + 'z.string(), ' + code.slice(position);
      return positions.length ? { code, map: null } : null;
    },
  };
}
