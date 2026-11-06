import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

/** Track runtime and type imports, including feature barrels and literal lazy route imports. */
export function inspectReachability(root = process.cwd()) {

  const sourceRoot = path.join(root, 'src') + path.sep;
  const config = ts.parseJsonConfigFileContent(
    ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile).config,
    ts.sys,
    root,
  );
  const files = config.fileNames
    .map((file) => path.resolve(file))
    .filter((file) => file.startsWith(sourceRoot));
  const graph = new Map();
  const dynamicImports = [];
  for (const file of files) {
    const source = ts.createSourceFile(
      file,
      fs.readFileSync(file, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
    );
    const edges = [];

    function visit(node) {

      let specifier;
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier)
        specifier = node.moduleSpecifier;
      if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument))
        specifier = node.argument.literal;
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        specifier = node.arguments[0];
        if (!specifier || !ts.isStringLiteralLike(specifier))
          dynamicImports.push(path.relative(root, file));
      }
      if (specifier && ts.isStringLiteralLike(specifier)) {
        const target = ts.resolveModuleName(specifier.text, file, config.options, ts.sys)
          .resolvedModule?.resolvedFileName;
        if (target && path.resolve(target).startsWith(sourceRoot)) edges.push(path.resolve(target));
      }
      ts.forEachChild(node, visit);
    }

    visit(source);
    graph.set(file, edges);
  }
  const visited = new Set();

  function reach(file) {

    if (visited.has(file)) return;
    visited.add(file);
    for (const target of graph.get(file) || []) reach(target);
  }

  reach(path.join(root, 'src/app/main.tsx'));
  // Ambient declarations are compiler entry points, not orphan runtime modules.
  for (const file of files.filter((file) => file.endsWith('.d.ts'))) reach(file);
  return {
    unreachable: files
      .filter((file) => !visited.has(file))
      .map((file) => path.relative(root, file)),
    dynamicImports,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = inspectReachability();
  for (const file of result.unreachable) console.error('Unreachable private source: ' + file);
  for (const file of result.dynamicImports) console.error('Unclassified dynamic import: ' + file);
  console.log(
    `${result.unreachable.length} orphan files; ${result.dynamicImports.length} unclassified dynamic imports`,
  );
  if (result.unreachable.length || result.dynamicImports.length) process.exitCode = 1;
}
