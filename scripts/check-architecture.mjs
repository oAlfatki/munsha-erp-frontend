import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { pathToFileURL } from 'node:url';
const walk = (d) =>
  fs
    .readdirSync(d, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
export function inspectArchitecture(root = process.cwd()) {
  const src = path.join(root, 'src');
  const cfg = ts.parseJsonConfigFileContent(
    ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile).config,
    ts.sys,
    root,
  ).options;
  const errors = [],
    files = walk(src).filter((f) => /\.tsx?$/.test(f)),
    graph = new Map(),
    domains = new Map(),
    allDomains = new Map();
  const owner = (f) =>
    path
      .relative(src, f)
      .replaceAll('\\', '/')
      .match(/^features\/([^/]+)\//)?.[1];
  function link(g, a, b) {
    if (!g.has(a)) g.set(a, new Set());
    g.get(a).add(b);
  }
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8'),
      sf = ts.createSourceFile(f, text, ts.ScriptTarget.Latest, true);
    const relative = path.relative(root, f);
    if (
      /\b(?:ErpReadModel|FeatureDataScope|useFeatureResources|mergeResources|useErpContext|postCommand)\b/.test(
        text,
      )
    )
      errors.push(relative + ': forbidden legacy data architecture');
    function visit(n) {
      let spec,
        runtime = true;
      if ((ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) && n.moduleSpecifier) {
        spec = n.moduleSpecifier;
        runtime = !n.isTypeOnly && !n.importClause?.isTypeOnly;
        const binding = n.importClause?.namedBindings || n.exportClause;
        if (
          binding?.elements?.length &&
          binding.elements.every((e) => e.isTypeOnly) &&
          !n.importClause?.name
        )
          runtime = false;
      }
      if (
        ts.isCallExpression(n) &&
        n.expression.kind === ts.SyntaxKind.ImportKeyword &&
        ts.isStringLiteral(n.arguments[0])
      )
        spec = n.arguments[0];
      if (ts.isImportTypeNode(n) && ts.isLiteralTypeNode(n.argument)) {
        spec = n.argument.literal;
        runtime = false;
      }
      if (spec && ts.isStringLiteralLike(spec)) {
        const target = ts.resolveModuleName(spec.text, f, cfg, ts.sys).resolvedModule
          ?.resolvedFileName;
        if (target?.startsWith(src + path.sep)) {
          const dest = path.relative(src, target).replaceAll('\\', '/'),
            from = path.relative(src, f).replaceAll('\\', '/');
          if (/^(core|shared)\//.test(from) && /^(app|features)\//.test(dest))
            errors.push(relative + ': infrastructure imports ' + dest);
          if (owner(f) && dest.startsWith('app/')) errors.push(relative + ': feature imports app');
          if (
            owner(f) &&
            owner(target) &&
            owner(f) !== owner(target) &&
            !dest.startsWith('features/' + owner(target) + '/public/')
          )
            errors.push(relative + ': private cross-feature import ' + dest);
          if (owner(f) && owner(target) && owner(f) !== owner(target))
            link(allDomains, owner(f), owner(target));
          if (runtime) {
            link(graph, f, target);
            if (owner(f) && owner(target) && owner(f) !== owner(target))
              link(domains, owner(f), owner(target));
          }
        }
      }
      ts.forEachChild(n, visit);
    }
    visit(sf);
  }
  function cycles(g) {
    let index = 0;
    const stack = [],
      on = new Set(),
      indices = new Map(),
      low = new Map(),
      out = [];
    function visit(v) {
      indices.set(v, index);
      low.set(v, index++);
      stack.push(v);
      on.add(v);
      for (const w of g.get(v) || []) {
        if (!indices.has(w)) {
          visit(w);
          low.set(v, Math.min(low.get(v), low.get(w)));
        } else if (on.has(w)) low.set(v, Math.min(low.get(v), indices.get(w)));
      }
      if (low.get(v) === indices.get(v)) {
        const c = [];
        let w;
        do {
          w = stack.pop();
          on.delete(w);
          c.push(w);
        } while (w !== v);
        if (c.length > 1) out.push(c);
      }
    }
    for (const v of g.keys()) if (!indices.has(v)) visit(v);
    return out;
  }
  // Vite drops CSS imports after rules even when an isolated PostCSS pass can expand them.
  // Keep one bootstrap stylesheet and legal top-level imports in every owned fragment.
  const cssFiles = walk(src).filter((file) => file.endsWith('.css'));
  for (const file of cssFiles) {
    const css = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    const rest = css.replace(/^\s*(?:@(?:import|charset)\s+[^;]+;\s*)*/, '');
    if (/@import\s/.test(rest))
      errors.push(path.relative(root, file) + ': CSS imports must precede all rules');
  }
  const styleEntries = [];
  for (const file of files) {
    const sf = ts.createSourceFile(
      file,
      fs.readFileSync(file, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
    );
    for (const n of sf.statements)
      if (ts.isImportDeclaration(n) && n.moduleSpecifier.text.endsWith('.css'))
        styleEntries.push({ file: path.relative(root, file), specifier: n.moduleSpecifier.text });
  }
  if (
    styleEntries.length !== 1 ||
    styleEntries[0]?.file !== 'src/app/main.tsx' ||
    styleEntries[0]?.specifier !== '@/app/styles.css'
  )
    errors.push('Expected exactly one CSS bootstrap import from app/main.tsx');
  const fileCycles = cycles(graph),
    featureCycles = cycles(domains),
    typeInclusiveFeatureCycles = cycles(allDomains);
  for (const cycle of fileCycles)
    errors.push('File cycle: ' + cycle.map((f) => path.relative(root, f)).join(' -> '));
  for (const cycle of featureCycles) errors.push('Feature cycle: ' + cycle.join(' -> '));
  for (const cycle of typeInclusiveFeatureCycles)
    errors.push('Type-inclusive feature cycle: ' + cycle.join(' -> '));
  return {
    sourceFiles: files.length,
    errors,
    fileCycles,
    featureCycles,
    typeInclusiveFeatureCycles,
    dependencies: Object.fromEntries(
      [...domains].map(([key, values]) => [key, [...values].sort()]),
    ),
  };
}
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = inspectArchitecture();
  if (process.argv.includes('--json')) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(
      `${result.sourceFiles} source files; ${result.fileCycles.length} file cycles; ${result.featureCycles.length} feature cycles; ${result.errors.length} violations`,
    );
    for (const error of result.errors) console.error(error);
  }
  if (result.errors.length) process.exitCode = 1;
}
