/** Readability spacing for named functions; inline event callbacks remain compact. */
export const readabilityRule = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
    messages: { blank: 'Leave a blank line {{location}}.' },
  },

  create(context) {

    const source = context.sourceCode;

    function gap(left, right, location) {

      if (!left || !right || right.loc.start.line - left.loc.end.line > 1) return;
      context.report({
        loc: right.loc,
        messageId: 'blank',
        data: { location },

        fix: (fixer) => fixer.insertTextAfterRange(left.range, '\n'),
      });
    }

    function body(node) {

      if (node.body?.type !== 'BlockStatement' || !node.body.body.length) return;
      gap(
        source.getFirstToken(node.body),
        source.getTokenAfter(source.getFirstToken(node.body), { includeComments: true }),
        'after the function opening brace',
      );
    }

    function separate(node) {

      const statement =
        node.parent?.type === 'ExportNamedDeclaration' ||
        node.parent?.type === 'ExportDefaultDeclaration'
          ? node.parent
          : node;
      if (!['Program', 'BlockStatement', 'ClassBody'].includes(statement.parent?.type)) return;
      const first = source.getCommentsBefore(statement)[0] || source.getFirstToken(statement);
      const previous = source.getTokenBefore(first, { includeComments: true });
      const next = source.getTokenAfter(statement, { includeComments: true });
      if (previous?.value !== '{') gap(previous, first, 'before a named function');
      if (next?.value !== '}') gap(source.getLastToken(statement), next, 'after a named function');
    }

    return {
      Program(node) {

        const imports = node.body.filter((item) => item.type === 'ImportDeclaration');
        const last = imports.at(-1);
        if (last)
          gap(
            source.getLastToken(last),
            source.getTokenAfter(last, { includeComments: true }),
            'after imports',
          );
      },

      FunctionDeclaration(node) {

        body(node);
        separate(node);
      },

      FunctionExpression(node) {

        if (node.parent?.type === 'MethodDefinition') {
          body(node);
          separate(node.parent);
        }
      },

      Property(node) {

        if (!['ArrowFunctionExpression', 'FunctionExpression'].includes(node.value?.type)) return;
        body(node.value);
        const first = source.getCommentsBefore(node)[0] || source.getFirstToken(node);
        const previous = source.getTokenBefore(first, { includeComments: true });
        if (previous?.value !== '{') gap(previous, first, 'before a named method');
        const comma = source.getTokenAfter(node);
        const next =
          comma?.value === ',' ? source.getTokenAfter(comma, { includeComments: true }) : null;
        if (next?.value !== '}') gap(comma, next, 'after a named method');
      },

      VariableDeclaration(node) {

        if (
          node.declarations.some((item) =>
            ['ArrowFunctionExpression', 'FunctionExpression'].includes(item.init?.type),
          )
        )
          separate(node);
        for (const declaration of node.declarations) {
          if (['ArrowFunctionExpression', 'FunctionExpression'].includes(declaration.init?.type))
            body(declaration.init);
        }
      },
    };
  },
};

export const readabilityPlugin = { rules: { spacing: readabilityRule } };
